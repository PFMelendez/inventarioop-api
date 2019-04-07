module.exports = (sequelize, DataTypes) => {
  class Usuario extends sequelize.Sequelize.Model { }
  Usuario.init({
    id_usuarios: {
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

    nombre_usuario: {
      allowNull: false,
      type: DataTypes.STRING(20),
      comment: 'Nomre de usuario para logueo',
      unique: true,
    },

    contrasena: {
      allowNull: false,
      type: DataTypes.STRING(15),
      comment: 'Contraseña del usuario para logeo',
    },

    cargo_usuario: {
      allowNull: true,
      type: DataTypes.INTEGER,
      comment: 'Clasificacion del usuario,capturiasta o encargado de inventario',
    },

    estado: {
      allowNull: true,
      type: DataTypes.STRING(25),
      comment: 'Informa el estado actual del usuario',
    },

    usuario_creo: {
      allowNull: true,
      type: DataTypes.INTEGER,
      comment: 'Id del usuario que creo el registro',
    },

    fecha_creacion: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: 'Fecha y hora de cracion del registro',
    },

    fecha_actualizacion: {
      allowNull: true,
      type: DataTypes.DATE,
      comment: 'Fecha y hora de ultimo movimiento en la base de datos de este registro',
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

  Usuario.associate = (models) => {
    models.Usuario.belongsTo(models.TipoUsuario, { foreignKey: 'tipo_usuario', as: 'TipoUsuario', targetKey: 'id_tipo_usuario' });
    models.Usuario.hasMany(models.Objetos, { foreignKey: 'usuario_registro_entrada', as: 'ObjetosRegistro' });
    models.Usuario.hasMany(models.Objetos, { foreignKey: 'usuario_registro_salida', as: 'ObjetosSalida' });
  };

  return Usuario;
};
