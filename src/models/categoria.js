module.exports = (sequelize, DataTypes) => {
  class Categoria extends sequelize.Sequelize.Model { }
  Categoria.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: 'Id auto asignada a cada categoria de objetos',
    },
    descripcion: {
      allowNull: false,
      type: DataTypes.STRING(50),
      comment: 'Campo para escribir una descripcion de la categoria',
    },
    estante: {
      allowNull: false,
      type: DataTypes.STRING(50),
      comment: 'Clave del estante',
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

  Categoria.associate = (models) => {
    models.Categoria.hasMany(models.Subcategoria, { foreignKey: 'categoria_id', as: 'Subcategorias' });
  };
  return Categoria;
};
