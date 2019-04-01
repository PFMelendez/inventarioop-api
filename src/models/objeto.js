module.exports = (sequelize, DataTypes) => {
	class Objeto extends sequelize.Sequelize.Model {}
	Objeto.init({
		id_objetos: {
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
			type: DataTypes.INTEGER,
		},

		fecha_ingreso: {
			allowNull: false,
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},

		fecha_egreso: {
			allowNull: false,
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},

		lugar_hallazgo: {
			allowNull: false,
			type: DataTypes.STRING,
		},

		etiquetas: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},

		informacion_adicional: {
			allowNull: false,
			type: DataTypes.STRING,
		},

		usuario_encontro: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},

		usuario_recibio: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},

		usuario_registro_entrada: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},

		usuario_registro_salida: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},

		estado: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},

		usuario_creo: {
			allowNull: true,
			type: DataTypes.INTEGER,
		},

		estado: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},

		fecha_creacion: {
			allowNull: false,
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},

		fecha_actualizacion: {
			allowNull: false,
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
	return Objeto
}