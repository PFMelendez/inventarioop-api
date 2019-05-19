module.exports = (sequelize, DataTypes) => {
  class Objetos extends sequelize.Sequelize.Model { }
  Objetos.init({
    id: {
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

    fechaIngreso: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: 'Fecha de ingrso del objeto, fomato YYYY-MM-DD-HH:MM:SS',
      field: 'fecha_ingreso',
    },

    fechaEgreso: {
      allowNull: true,
      type: DataTypes.DATE,
      comment: 'Fecha de salida del objeto, fomato YYYY-MM-DD-HH:MM:SS',
      field: 'fecha_egreso',
    },

    lugarHallazgo: {
      allowNull: true,
      type: DataTypes.STRING(25),
      comment: 'Nombre del Area donde se encontro el objeto',
      field: 'lugar_hallazgo',
    },

    informacionAdicional: {
      allowNull: true,
      type: DataTypes.STRING(100),
      comment: 'Datos extra sobre el objeto al entrar al inventario',
      field: 'informacion_adicional',
    },

    usuarioRegistroEntrada: {
      allowNull: true,
      type: DataTypes.INTEGER,
      comment: 'Llave foranea  al tipo de usuario que registro el objeto en el sistema',
      field: 'usuario_registro_entrada',
    },

    usuarioRegistroSalida: {
      allowNull: true,
      type: DataTypes.INTEGER,
      comment: 'Llave foranea  al tipo de usuario que registro la sealida del objeto',
      field: 'usuario_registro_salida',
    },

    estadoId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: 'Informa el estado actual del objeto',
      field: 'id_estado',
    },

    usuarioCreo: {
      allowNull: true,
      type: DataTypes.INTEGER,
      comment: 'Id del usuario que creo el registro',
      field: 'ususario_creo',
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
      field: 'fechaActualizacion',
    },

    eliminado: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      comment: 'La utilidad de activar o desactivar registro',
    },
  }, {
    timestamps: true,
    underscored: true,
    paranoid: true,
    sequelize,
  });

  Objetos.associate = (models) => {
    models.Objetos.belongsTo(models.Usuarios, {
      foreignKey: 'usuarioRegistroEntrada',
      as: 'UsuarioEntrada',
    });
    models.Objetos.belongsTo(models.Usuarios, {
      foreignKey: 'usuarioRegistroSalida',
      as: 'UsuarioSalida',
    });
    models.Objetos.belongsTo(models.Estados, { as: 'Estado', foreignKey: 'estadoId' });
    models.Objetos.belongsToMany(models.Etiquetas, {
      as: 'Etiquetas',
      through: 'objetos_etiquetas',
      // foreignKey: 'id_objeto',
    });
    models.Objetos.belongsTo(models.Subcategorias, { as: 'Subcategoria', foreignKey: 'subcategoriaId' });
    models.Objetos.belongsTo(models.Categorias, { as: 'Categoria', foreignKey: 'categoriaId' });
  };

  return Objetos;
};
