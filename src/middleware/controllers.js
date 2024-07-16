const { PRIVATE_INFO, Store, Op } = require('../db.js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


const generateSalt = () => {
	const length = 16;
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
};


const hashFunction = (password, secret) => {
	const hash = crypto.createHash('sha256');
	hash.update(password + secret);
	return hash.digest('hex');
};


const generateAuthToken = (id_user, validUntil, salt) => {
	const payload = {
		id_user,
		valid_until: validUntil
	};
	return jwt.sign(payload, salt, { expiresIn: '30m' });
};


const decodeToken = (token, salt) => {
	try {
		const decoded = jwt.verify(token, salt);
		return decoded;
	} catch (err) {
		console.error('Error decoding token:', err);
		return null;
	}
};


module.exports =  {
	generateSalt,
	hashFunction,
	generateAuthToken,
	decodeToken
};


// const validateAccountPassword = async (userId, hashedPass) => {
//     const result = await Password.findOne({where: {
//         [Op.and]: [
//           { user_id: userId },
//           { password: hashedPass },
//           { is_active: true }
//         ]
//       }})
//       return ( result && result.id > 0 ? true : false );
// }

