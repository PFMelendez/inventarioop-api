import Models from '../models';

export default {
  getAll: async () => {
    const etiqueta = await Models.Etiqueta.findAll();

    return etiqueta;
  },

  findAll: async (nombre) => {
    const { Op } = Models.Etiqueta.sequelize.Sequelize;
    const etiqueta = await Models.Etiqueta.findAll({
      where: {
        nombre_etiqueta: {
          [Op.like]: `%${nombre}%`,
        },
      },
    });

    return etiqueta;
  },

  create: async (params) => {
    const { nombre_etiqueta } = params;

    if (!nombre_etiqueta) {
      throw new Error('Missing Fields');
    }

    // const codigo = nombre_etiqueta;
    // codigo.toLowerCase();

    return Models.Etiqueta.create({ nombre_etiqueta });
  },
};
