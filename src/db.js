/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
require('dotenv').config();
const {Sequelize, Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_DIALECT, DB_PORT } = process.env;

const sequelize = new Sequelize(`${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
	.filter(
		(file) =>
			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
	)
	.forEach(
		(file) => {
			modelDefiners.push(require(path.join(__dirname, '/models', file)));
	});

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Convertir completamente los nombres de los modelos a mayúsculas
const entries = Object.entries(sequelize.models);
const capsEntries = entries.map(([key, value]) => [
  key.toUpperCase(),
  value,
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {	USERS, PROVINCES, PRIVATE_INFO, PHONE_NUMBERS } = sequelize.models;

//! Relaciones
	// Define la relación USERS con PROVINCES
USERS.belongsTo(PROVINCES, { foreignKey: 'id_province'	});
	// Define la relación PRIVATE_INFO con USERS
PRIVATE_INFO.belongsTo(USERS, { foreignKey: 'id_user' });
	// Define la relación PHONE_NUMBERS con USERS
PHONE_NUMBERS.belongsTo(USERS, { foreignKey: 'id_user' });
	// Define la relación USERS con PHONE_NUMBERS 
USERS.hasMany(PHONE_NUMBERS, { foreignKey: 'id_user' });

module.exports = {
	...sequelize.models,
	Op, 				// para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize,	// para importart la conexión { conn } = require('./db.js');
};
