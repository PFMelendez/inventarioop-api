module.exports = (sequelize, DataTypes) => {
	class Etiqueta extends sequelize.Sequelize.Model {}
	Etiqueta.init({
		id_etiquta: {
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
			type: DataTypes.INTEGER,
		},

		nombre_etiqueta: {
			allowNull: false,
			type: DataTypes.STRING,
		},

		usuario_creo: {
			allowNull: true,
			type: DataTypes.INTEGER,
		},

		fecha_creacion: {
			allowNull: true,
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},

		fecha_actualizacion: {
			allowNull: true,
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},

		eliminado: {
			allowNull: true,
			type: DataTypes.INTEGER,
			defaultValue: 0,
		}
	}, {
		timestamps: false,
		underscored: true,
		sequelize
	});
	return Etiqueta
}