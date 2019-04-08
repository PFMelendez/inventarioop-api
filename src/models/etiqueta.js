module.exports = (sequelize, DataTypes) => {
  class Etiqueta extends sequelize.Sequelize.Model { }
  Etiqueta.init({
    id_etiqueta: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: 'Id auto asignada a cada etiqueta',
    },

    nombre_etiqueta: {
      allowNull: false,
      type: DataTypes.STRING(20),
      comment: 'Nombre de la etiqueta',
    },

    // codigo_etiqueta: {
    //   allowNull: false,
    //   type: DataTypes.STRING(20),
    //   comment: 'Codigo para buscar la etiqueta por texto en vez de id',
    // },

    usuario_creo: {
      allowNull: true,
      type: DataTypes.INTEGER,
      comment: 'Id del usuario que creo el registro',
    },

    fecha_creacion: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: 'Fecha y hora de cracion del registro',
    },

    fecha_actualizacion: {
      allowNull: true,
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
    sequelize,
  });

  Etiqueta.associate = (models) => {
    models.Etiqueta.belongsToMany(models.Objetos, {
      as: 'etiquetas',
      through: 'objeto_etiqueta',
      constraints: false,
    });
  };

  return Etiqueta;
};
