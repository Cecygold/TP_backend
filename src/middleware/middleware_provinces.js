
const { conn } = require("../db");
const { PROVINCES } = conn.models;

const provincesGetAll = async (req, res) => {
	try {
		const results = await PROVINCES.findAll({
				attributes: ['name', 'short_name'],
				order: [['name', 'ASC']]
			}
		);
		return  res.status(200).json( results );
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
}

module.exports = {
	provincesGetAll
};