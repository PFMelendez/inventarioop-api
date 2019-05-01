module.exports = (sequelize, DataTypes) => {
  class Estados extends sequelize.Sequelize.Model { }
  Estados.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: 'Id auto asignada a cada Estado',
    },

    descripcion: {
      allowNull: false,
      type: DataTypes.STRING(50),
      comment: 'Campo para escribir una descripcion de la Estado',
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
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: 'Fecha y hora de ultimo movimiento en la base de datos de este registro',
      field: 'fecha_actualizacion',
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
    tableName: 'estados',
    sequelize,
  });

  Estados.associate = (models) => {
    models.Estados.hasMany(models.Objetos);
  };

  return Estados;
};
