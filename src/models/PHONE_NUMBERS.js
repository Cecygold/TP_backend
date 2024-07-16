
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define('PHONE_NUMBERS', {
		id_phone: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		id_user: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			unique: false,
			references: {
				model: 'USERS',  	// Nombre de la tabla a la que referencia
				key: 'id_user'   	// Nombre de la columna de referencia en PROVINCES
			}
		},
		area_code:{
			type: DataTypes.STRING(4),
			allowNull: true
		},
		phone: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		is_whatsapp: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		}
	}, {
		// schema: 'public',			// Determina el 'Schema' de la tabla
		tableName: 'PHONE_NUMBERS',		// Cambia el nombre de la tabla si deseas
		timestamps: false,				// Deshabilita timestamps automáticos
		paranoid: false,				// Opcional: habilita la eliminación suave (soft delete)
		indexes: [						// Un usuario puede tener un único numero telefónico
			{
				name: 'unique_phone_per_user',
				unique: true,
				fields: ['id_user', 'area_code', 'phone']
			}
		]
	});
};