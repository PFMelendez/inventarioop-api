module.exports = (sequelize, DataTypes) => {
	class Categoria extends sequelize.Sequelize.Model {}
	Categoria.init({
		id_categoria: {
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
			type: DataTypes.INTEGER,
		},

		descripcion: {
			allowNull: false,
			type: DataTypes.STRING,
		},

		usuario_creo: {
			allowNull: true,
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
	return Categoria
}