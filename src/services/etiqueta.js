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
};
