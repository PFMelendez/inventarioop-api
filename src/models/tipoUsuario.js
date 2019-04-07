module.exports = (sequelize, DataTypes) => {
  class TipoUsuario extends sequelize.Sequelize.Model { }
  TipoUsuario.init({
    id_tipo_usuario: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: 'Id auto asignada a cada TipoUsuario de objetos',
    },

    nombre: {
      allowNull: false,
      type: DataTypes.STRING(50),
      comment: 'Llave foranea a la Categoria principal',
      field: 'nombre_tipo_usuario',
    },

    display: {
      allowNull: false,
      type: DataTypes.STRING(50),
      comment: 'Campo para escribir una descripcion de la TipoUsuario',
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
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: 'Fecha y hora de ultimo movimiento en la base de datos de este registro',
    },

    eliminado: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      comment: 'La utilidad de activar o desactivar registro',
    },
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'tipo_usuarios',
    sequelize,
  });

  TipoUsuario.associate = (models) => {
    models.TipoUsuario.hasMany(models.Usuario);
  };

  return TipoUsuario;
};
