module.exports = (sequelize, DataTypes) => {
  class Subcategoria extends sequelize.Sequelize.Model { }
  Subcategoria.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: 'Id auto asignada a cada subcategoria de objetos',
    },

    descripcion: {
      allowNull: false,
      type: DataTypes.STRING(50),
      comment: 'Campo para escribir una descripcion de la Subcategoria',
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
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      comment: 'La utilidad de activar o desactivar registro',
    },
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'subcategoria',
    sequelize,
  });

  Subcategoria.associate = (models) => {
    models.Subcategoria.belongsTo(models.Categoria, { as: 'Categoria', foreignKey: 'categoria_id' });
    models.Subcategoria.hasMany(models.Objetos);
  };

  return Subcategoria;
};
