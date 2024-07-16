const { conn } = require("../db");
const { USERS, PHONE_NUMBERS, PRIVATE_INFO } = conn.models;
const { decodeToken } = require('./controllers.js');


const phoneNumbersAddNumber = async (req, res) => {
	try {
		const { token, nickname, area_code, phone, isWhatsapp } = req.body;
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
		// Se crea numero de telefono PHONE_NUMBERS
		await PHONE_NUMBERS.create({ 
			id_user: user.id_user, area_code, phone, is_whatsapp: isWhatsapp 
		});
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
			phones: phonesView
		});

	} catch (error) {
		if (error.name === 'SequelizeUniqueConstraintError') {
			return res.status(400).json({ error: 'Este número ya está registrado.' });
		}
		return res.status(500).json({ error: 'Error al agregar el número de teléfono.' });
	}
};

module.exports = {
	phoneNumbersAddNumber
};

