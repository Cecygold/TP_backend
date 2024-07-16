const { conn } = require("../db");
const { USERS, PROVINCES, PHONE_NUMBERS, PRIVATE_INFO } = conn.models;
const { generateSalt, hashFunction, generateAuthToken, decodeToken } = require('./controllers.js');
const { Op } = require('sequelize');


const usersPostNew = async (req, res) => {
	try {
		const { 
			name, lastname, nickname, email, province_short_name,
			area_code, phone, isWhatsapp, password
		} = req.body;

		// Se verifica que el usuario no exista
		const user = await USERS.findOne({
			where: {
				[Op.or]: [
					{ nickname: nickname },
					{ email: email }
				]
			}
		});

		// Si ya existe un usuario con el mismo nickname o email, lanzar un error
		if (user) throw new Error('Ya existe un usuario con este Apodo o Email');

		// Se encripta la contraseña
		const salt = generateSalt();
		const hashedPassword = hashFunction(password, salt);

		// Obtener ID de provincia
		const province = await PROVINCES.findOne({
			attributes: ['id_province'],
			where: { short_name: province_short_name }
		});

		if (!province.id_province) throw new Error('Provincia no encontrada');

		// Iniciar transacción
		const transaction = await conn.transaction();

		try {
			// Se crea el usuario USERS
			const userNew = await USERS.create({ 
				name, lastname, nickname, email, id_province: province.id_province
			}, { transaction });

			// Se crea numero de telefono PHONE_NUMBERS
			const phoneNew = await PHONE_NUMBERS.create({ 
				id_user: userNew.id_user, area_code, phone, is_whatsapp: isWhatsapp 
			}, { transaction });

			// Se crea la información privada PRIVATE_INFO
			const privateInfoNew = await PRIVATE_INFO.create({ 
				id_user: userNew.id_user, password: hashedPassword, salt 
			}, { transaction });

			// Confirmar transacción
			await transaction.commit();

			return res.status(200).json({ message: `Gracias por registrarse ${userNew.name} ${userNew.lastname}.` });
		} catch (error) {
			// Revertir transacción en caso de error
			await transaction.rollback();
			throw error;
		}
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};


const usersPostLogin = async (req, res) => {
	try {
		// Extraer data de BODY
		const { nickname, password } = req.body;

		// Buscar usuario
		const user = await USERS.findOne({
			where: { nickname: nickname }
		});
		// lanza error si el apodo no existe
		if (!user) throw new Error('Nombre de usuario o contraseña incorrectos.');

		const privateInfo = await PRIVATE_INFO.findOne({
			where: { id_user: user.id_user }
		});
		const hashedPassword = hashFunction(password, privateInfo.salt);
		// Lanza error si las contraseñas hasheadas no coinciden
		if (privateInfo.password != hashedPassword) throw new Error('Nombre de usuario o contraseña incorrectos.');

		// Calcular la fecha y hora de vencimiento del token (actual + 30 minutos)
		const validUntil = new Date(Date.now() + 30 * 60000);
		// Generar el token
		const authToken = generateAuthToken(user.id_user, validUntil, privateInfo.salt);
		// Actualizar el token y la fecha de vencimiento en la base de datos
		await PRIVATE_INFO.update(
			{ token: authToken, valid_until: validUntil },
			{ where: { id_user: user.id_user } }
		);
		
		const phones = await PHONE_NUMBERS.findAll(
			{ where: { id_user: user.id_user },
			order: [['id_phone', 'ASC']] }
		);

		const phonesView = phones.map(phone => (
			{
				area_code: phone.area_code,
				phone: phone.phone,
				is_whatsapp: phone.is_whatsapp
			}
		));
		return res.status(200).json({ 
			token: authToken,
			nickname: user.nickname,
			valid_until: validUntil,
			phones: phonesView
		});
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};


const usersDeleteUser = async (req, res) => {
	try {
		const { token, nickname } = req.body;

		// Buscar usuario
		const user = await USERS.findOne({
			where: { nickname: nickname }
		});
		if(!user) {
			return res.status(401).json({ error: 'Datos no válidos.' });
		}
		const privateInfo = await PRIVATE_INFO.findOne({
			where: { id_user: user.id_user }
		});
	
		// Desencripta el token
		const decoded = decodeToken(token, privateInfo.salt);
	
		if(!decoded.id_user || !decoded.valid_until) {
			return res.status(401).json({ error: 'Su token no corresponde o pudo haber sido alterado.' });
		};
		const { id_user, valid_until } = decoded;
		// Lanza Error si el token es incorrecto o ha sido alterrado
		if(token != privateInfo.token) {
			return res.status(401).json({ error: 'El token no es válido.' });
		}
		if(id_user != user.id_user) {
			return res.status(401).json({ error: 'Su token no corresponde o pudo haber sido alterado.' });
		};
		if (new Date() > new Date(valid_until)){
			return res.status(401).json({ error: 'Su tiempo de login ha caducado.' });
		};

		//* Eliminar el usuario y la información relacionada
		// Iniciar transacción
		const transaction = await conn.transaction();
		try {
			const rows = await PRIVATE_INFO.destroy({
				where: {
					[Op.and]: [
						{ id_user: id_user },
						{ valid_until: valid_until }
					]
				}
			}, { transaction });
			if (rows < 1) throw new Error('No se encontraron elementos para borrar.');
			await PHONE_NUMBERS.destroy({ where: { id_user: id_user } }, { transaction });
			await USERS.destroy({ where: { id_user: id_user } }, { transaction });	
			// Confirmar transacción
			await transaction.commit();	
			return res.status(200).json({ message: `Adios ${user.name} ${user.lastname}.` });
		} catch (error) {
			// Revertir transacción en caso de error
			await transaction.rollback();
			return res.status(500).json({ error: 'Error al eliminar usuario y su información.' });		
		}
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};


const usersPutValidUntil = async (req, res) => {
	try {
		const { token, nickname } = req.body;

		// Buscar usuario
		const user = await USERS.findOne({
			where: { nickname: nickname }
		});
		if(!user) {
			return res.status(401).json({ error: 'Datos no válidos.' });
		}
		const privateInfo = await PRIVATE_INFO.findOne({
			where: { id_user: user.id_user }
		});
	
		// Desencripta el token
		const decoded = decodeToken(token, privateInfo.salt);
		
		if(!decoded.id_user || !decoded.valid_until) {
			return res.status(401).json({ error: 'Su token no corresponde o pudo haber sido alterado.' });
		};
		const { id_user, valid_until } = decoded;
		// Lanza Error si el token es incorrecto o ha sido alterrado
		if(token != privateInfo.token ) {
			return res.status(401).json({ error: 'El token no es válido.' });
		}
		if(id_user != user.id_user) {
			return res.status(401).json({ error: 'Su token no corresponde o pudo haber sido alterado.' });
		};
		if (new Date() > new Date(valid_until)){
			return res.status(401).json({ error: 'Su tiempo de login ha caducado.' });
		};

		// Calcular la fecha y hora de vencimiento del token (actual + 30 minutos)
		const validUntilNew = new Date(Date.now() + 30 * 60000);
		// Generar el token
		const authToken = generateAuthToken(user.id_user, validUntilNew, privateInfo.salt);
		// Actualizar el token y la fecha de vencimiento en la base de datos
		await PRIVATE_INFO.update(
			{ token: authToken, valid_until: validUntilNew },
			{ where: { id_user: user.id_user } }
		);
		return res.status(200).json({ 
			token: authToken,
			nickname: user.nickname,
			valid_until: validUntilNew
		});
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = {
	usersPostNew,
	usersPostLogin,
	usersDeleteUser,
	usersPutValidUntil
};
