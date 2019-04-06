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

    fecha_ingreso: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: 'Fecha de ingrso del objeto, fomato YYYY-MM-DD-HH:MM:SS',
    },

    fecha_egreso: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: 'Fecha de salida del objeto, fomato YYYY-MM-DD-HH:MM:SS',
    },

    lugar_hallazgo: {
      allowNull: false,
      type: DataTypes.STRING(25),
      comment: 'Nombre del Area donde se encontro el objeto',
    },

    etiquetas: {
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: 'Llave foranea para las etiquetas de caracteristicas',
    },

    informacion_adicional: {
      allowNull: false,
      type: DataTypes.STRING(100),
      comment: 'Datos extra sobre el objeto al entrar al inventario',
    },

    usuario_encontro: {
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: 'Llave foranea al tipo de usuario que encotro el objeto',
    },

    usuario_recibio: {
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: 'Llave foranea  al tipo de usuario que recibio el objeto en almacen',
    },

    usuario_registro_entrada: {
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: 'Llave foranea  al tipo de usuario que registro el objeto en el sistema',
    },

    usuario_registro_salida: {
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: 'Llave foranea  al tipo de usuario que registro la sealida del objeto',
    },

    estado: {
      allowNull: false,
      type: DataTypes.INTEGER,
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
    sequelize,
  });

  Objetos.associate = (models) => {
    models.Objetos.hasMany(models.Etiqueta, { constraints: false });
    models.Objetos.belongsTo(models.Usuario, { foreignKey: 'usuario_registro_entrada' });
    models.Objetos.belongsTo(models.Usuario, { foreignKey: 'usuario_registro_salida' });
    models.Objetos.belongsTo(models.Estado);
  };

  return Objetos;
};
