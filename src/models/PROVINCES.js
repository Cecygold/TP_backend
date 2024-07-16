
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define('PROVINCES', {
		id_province: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name:{
			type: DataTypes.STRING(50),
			unique: true
		},
		short_name: {
			type: DataTypes.STRING(4),
			unique: true
		}
	}, {
		// schema: 'public',         // Determina el 'Schema' de la tabla
		tableName: 'PROVINCES',      // Cambia el nombre de la tabla si deseas
		timestamps: false,           // Deshabilita timestamps automáticos
		paranoid: false,             // Opcional: habilita la eliminación suave (soft delete)
	});
};