
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define('USERS', {
		id_user: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name:{
			type: DataTypes.STRING(100),
			allowNull: false
		},
		lastname: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		nickname: {
			type: DataTypes.STRING(30),
			allowNull: false,
			unique: true,
		},
		email:{
			type: DataTypes.STRING(50),
			allowNull: false
        },
		id_province: {
			type: DataTypes.INTEGER.UNSIGNED,
			references: {
                model: 'PROVINCES',  // Nombre de la tabla a la que referencia
                key: 'id_province'   // Nombre de la columna de referencia en PROVINCES
            }
		}
	}, {
		// schema: 'public',         // Determina el 'Schema' de la tabla
		tableName: 'USERS',          // Cambia el nombre de la tabla si deseas
		timestamps: false,           // Deshabilita timestamps automáticos
		paranoid: false,             // Opcional: habilita la eliminación suave (soft delete)
	});
};