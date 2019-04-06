module.exports = (sequelize, DataTypes) => {
  class Subcategoria extends sequelize.Sequelize.Model { }
  Subcategoria.init({
    id_sub_categoria: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: 'Id auto asignada a cada subcategoria de objetos',
    },

    id_categoria: {
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: 'Llave foranea a la Categoria principal',
    },

    nombre_categoria: {
      allowNull: false,
      type: DataTypes.STRING(20),
      comment: 'Nombre de tipo de subCategoria',
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
    tableName: 'subcategorias',
    sequelize,
  });

  Subcategoria.associate = (models) => {
    models.Subcategoria.belongsTo(models.Categoria);
  };

  return Subcategoria;
};
