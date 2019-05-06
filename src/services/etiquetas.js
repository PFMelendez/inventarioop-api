import Models from '../models';

export default {
  getAll: async () => {
    const etiqueta = await Models.Etiquetas.findAll();

    return etiqueta;
  },

  findAll: async (params) => {
    const { nombre } = params;
    const { Op } = Models.Sequelize;
    const etiqueta = await Models.Etiquetas.findAll({
      where: {
        nombreEtiqueta: {
          [Op.like]: `%${nombre}%`,
        },
      },
    });

    return etiqueta;
  },

  create: async (params) => {
    const { nombre_etiqueta: nombreEtiqueta } = params;

    if (!nombreEtiqueta) {
      throw new Error('Missing Fields');
    }

    // const codigo = nombreEtiqueta;
    // codigo.toLowerCase();

    return Models.Etiquetas.create({ nombreEtiqueta });
  },
};
