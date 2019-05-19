module.exports = (sequelize, DataTypes) => {
  class Etiquetas extends sequelize.Sequelize.Model { }
  Etiquetas.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: 'Id auto asignada a cada etiqueta',
    },

    nombreEtiqueta: {
      allowNull: false,
      type: DataTypes.STRING(20),
      comment: 'Nombre de la etiqueta',
      field: 'nombre_etiqueta',
    },

    // codigo_etiqueta: {
    //   allowNull: false,
    //   type: DataTypes.STRING(20),
    //   comment: 'Codigo para buscar la etiqueta por texto en vez de id',
    // },

    usuarioCreo: {
      allowNull: true,
      type: DataTypes.INTEGER,
      comment: 'Id del usuario que creo el registro',
      field: 'usuario_creo',
    },

    fechaCreacion: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: 'Fecha y hora de cracion del registro',
      field: 'fecha_creacion',
    },

    fechaActualizacion: {
      allowNull: true,
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
    paranoid: true,
    sequelize,
  });

  Etiquetas.associate = (models) => {
    models.Etiquetas.belongsToMany(models.Objetos, {
      as: 'Objetos',
      through: 'objetos_etiquetas',
      // foreignKey: 'id_etiqueta',
    });
  };

  return Etiquetas;
};
