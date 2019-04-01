module.exports = (sequelize, DataTypes) => {
	class Usuario extends sequelize.Sequelize.Model {}
	Usuario.init({
		id_usuarios: {
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
			type: DataTypes.INTEGER,
		},

		nombre: {
			allowNull: false,
			type: DataTypes.STRING,
		},

		apellidos: {
			allowNull: false,
			type: DataTypes.STRING,
		},

		correo: {
			allowNull: false,
			type: DataTypes.STRING,
		},

		telefono: {
			allowNull: false,
			type: DataTypes.STRING,
		},

		nombre_usuario: {
			allowNull: false,
			type: DataTypes.STRING,
		},

		contrasena: {
			allowNull: false,
			type: DataTypes.STRING,
		},

		cargo_usuario: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},

		estado: {
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

		// // Foreign Key
		// bar_id: {
		// 	type: DataTypes.INTEGER,
		// 	references: {
		// 		model: Bar,
		// 		key: 'id'
		// 	}
		// }
	}, {
		timestamps: false,
		underscored: true,
		sequelize
	});
	return Usuario
}