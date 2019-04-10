module.exports = (sequelize, DataTypes) => {
  class Objetos extends sequelize.Sequelize.Model { }
  Objetos.init({
    id_objetos: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: 'Id auto asignada a un nuevo usuario',
    },

    nombre: {
      allowNull: false,
      type: DataTypes.STRING(100),
      comment: 'Nombre del objeto',
    },

    fecha_ingreso: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: 'Fecha de ingrso del objeto, fomato YYYY-MM-DD-HH:MM:SS',
    },

    fecha_egreso: {
      allowNull: true,
      type: DataTypes.DATE,
      comment: 'Fecha de salida del objeto, fomato YYYY-MM-DD-HH:MM:SS',
    },

    lugar_hallazgo: {
      allowNull: true,
      type: DataTypes.STRING(25),
      comment: 'Nombre del Area donde se encontro el objeto',
    },

    informacion_adicional: {
      allowNull: true,
      type: DataTypes.STRING(100),
      comment: 'Datos extra sobre el objeto al entrar al inventario',
    },

    usuario_registro_entrada: {
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: 'Llave foranea  al tipo de usuario que registro el objeto en el sistema',
    },

    usuario_registro_salida: {
      allowNull: true,
      type: DataTypes.INTEGER,
      comment: 'Llave foranea  al tipo de usuario que registro la sealida del objeto',
    },

    id_estado: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: 'Informa el estado actual del objeto',
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

  Objetos.associate = (models) => {
    models.Objetos.belongsTo(models.Usuario, {
      foreignKey: 'usuario_registro_entrada',
    });
    models.Objetos.belongsTo(models.Usuario, {
      foreignKey: 'usuario_registro_salida',
    });
    models.Objetos.belongsTo(models.Estado, { as: 'Estado', foreignKey: 'id_estado' });
    models.Objetos.belongsToMany(models.Etiqueta, {
      as: 'Etiquetas',
      through: 'objeto_etiqueta',
      foreignKey: 'id_objeto',
    });
    models.Objetos.belongsTo(models.Subcategoria, { as: 'Subcategoria', foreignKey: 'id_subcategoria' });
  };

  return Objetos;
};
