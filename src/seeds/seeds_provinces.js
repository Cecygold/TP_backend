
const { PROVINCES } = require('../db.js')

const provinces = [
	{ name: 'Buenos Aires', short_name: 'BA'},
	{ name: 'Catamarca', short_name: 'CT'},
	{ name: 'Chaco', short_name: 'CH'},
	{ name: 'Chubut', short_name: 'CB'},
	{ name: 'Córdoba', short_name: 'CD'},
	{ name: 'Corrientes', short_name: 'CR'},
	{ name: 'Entre Ríos', short_name: 'ER'},
	{ name: 'Formosa', short_name: 'FO'},
	{ name: 'Jujuy', short_name: 'JU'},
	{ name: 'La Pampa', short_name: 'LP'},
	{ name: 'La Rioja', short_name: 'LR'},
	{ name: 'Mendoza', short_name: 'ME'},
	{ name: 'Misiones', short_name: 'MI'},
	{ name: 'Neuquén', short_name: 'NE'},
	{ name: 'Río Negro', short_name: 'RN'},
	{ name: 'Salta', short_name: 'SA'},
	{ name: 'San Juan', short_name: 'SJ'},
	{ name: 'San Luis', short_name: 'SL'},
	{ name: 'Santa Cruz', short_name: 'SC'},
	{ name: 'Santa Fe', short_name: 'SF'},
	{ name: 'Santiago del Estero', short_name: 'SE'},
	{ name: 'Tierra del Fuego', short_name: 'TF'},
	{ name: 'Tucumán', short_name: 'TU'},
	{ name: 'Ciudad Autónoma de Buenos Aires', short_name: 'CABA'}
];

module.exports = async function() {
	await PROVINCES.bulkCreate(provinces);
};
