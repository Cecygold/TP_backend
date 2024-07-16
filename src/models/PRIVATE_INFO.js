
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define('PRIVATE_INFO', {
		id_user: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			unique: true,
			primaryKey: true,
			references: {
				model: 'USERS',  	// Nombre de la tabla a la que referencia
				key: 'id_user'   	// Nombre de la columna de referencia en PROVINCES
			}
		},
		password:{
			type: DataTypes.STRING(255),
			allowNull: false
		},
		salt: {
			type: DataTypes.STRING(16),
			allowNull: false
		},
		token: {
			type: DataTypes.STRING(512),
			allowNull: true
		},
		valid_until: {
			type: DataTypes.DATE(6),
			allowNull: true
		}
	}, {
		// schema: 'public',         // Determina el 'Schema' de la tabla
		tableName: 'PRIVATE_INFO',   // Cambia el nombre de la tabla si deseas
		timestamps: false,           // Deshabilita timestamps automáticos
		paranoid: false,             // Opcional: habilita la eliminación suave (soft delete)
	});
};