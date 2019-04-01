module.exports = (sequelize, DataTypes) => {
	class Subcategoria extends sequelize.Sequelize.Model {}
	Subcategoria.init({
		id_sub_categoria: {
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
			type: DataTypes.INTEGER,
		},

		id_categoria: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},

		nombre_categoria: {
			allowNull: false,
			type: DataTypes.STRING,
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
		freezeTableName: true,
		tableName: 'cat_sub_categorias',
		sequelize
	});
	return Subcategoria
}