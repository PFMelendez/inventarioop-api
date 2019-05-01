module.exports = (sequelize, DataTypes) => {
  class Usuarios extends sequelize.Sequelize.Model { }
  Usuarios.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: 'Id auto asignada a un nuevo usuario',
    },

    nombre: {
      allowNull: false,
      type: DataTypes.STRING(25),
      comment: 'Nombre del usuario',
    },

    apellidos: {
      allowNull: false,
      type: DataTypes.STRING(40),
      comment: 'Los apellidos del usuario',
    },

    correo: {
      allowNull: false,
      type: DataTypes.STRING(50),
      comment: 'Correo electronico del usuario',
      unique: true,
    },

    telefono: {
      allowNull: true,
      type: DataTypes.STRING(14),
      comment: 'Nunero telefonico del usuario',
    },

    nombreUsuario: {
      allowNull: false,
      type: DataTypes.STRING(20),
      comment: 'Nomre de usuario para logueo',
      unique: true,
      field: 'nombre_usuario',
    },

    contrasena: {
      allowNull: false,
      type: DataTypes.STRING(15),
      comment: 'Contraseña del usuario para logeo',
    },

    cargoUsuario: {
      allowNull: true,
      type: DataTypes.INTEGER,
      comment: 'Clasificacion del usuario,capturiasta o encargado de inventario',
      field: 'cargo_usuario',
    },

    estado: {
      allowNull: true,
      type: DataTypes.STRING(25),
      comment: 'Informa el estado actual del usuario',
    },

    tipoUsuarioId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: 'Informa el estado actual del objeto',
      field: 'tipo_usuario_id',
    },

    usuarioCreo: {
      allowNull: true,
      type: DataTypes.INTEGER,
      comment: 'Id del usuario que creo el registro',
      field: 'usuario_creo',
    },

    fechaCreacion: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: 'Fecha y hora de cracion del registro',
      field: 'fecha_creacion',
    },

    fechaActualizacion: {
      allowNull: true,
      type: DataTypes.DATE,
      comment: 'Fecha y hora de ultimo movimiento en la base de datos de este registro',
      field: 'fecha_actualizacion',
    },

    eliminado: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      comment: 'La utilidad de activar o desactivar registro',
    },
  }, {
    timestamps: false,
    underscored: true,
    sequelize,
  });

  Usuarios.associate = (models) => {
    models.Usuarios.belongsTo(models.TiposUsuarios, { foreignKey: 'tipoUsuarioId', as: 'TipoUsuario', targetKey: 'id' });
    models.Usuarios.hasMany(models.Objetos, { foreignKey: 'usuarioRegistroEntrada', as: 'ObjetosRegistro' });
    models.Usuarios.hasMany(models.Objetos, { foreignKey: 'usuarioRegistroSalida', as: 'ObjetosSalida' });
  };

  return Usuarios;
};
