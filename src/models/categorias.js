module.exports = (sequelize, DataTypes) => {
  class Categorias extends sequelize.Sequelize.Model { }
  Categorias.init({
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

  Categorias.associate = (models) => {
    models.Categorias.hasMany(models.Subcategorias, { foreignKey: 'categoriaId', as: 'Subcategorias' });
  };
  return Categorias;
};
