import Models from '../models';

export default {
  getAll: async () => {
    const categorias = await Models.Categoria.findAll({
      include: [
        { all: true },
      ],
    });

    return categorias;
  },

  create: async (params) => {
    const { descripcion, estante } = params;

    if (!descripcion || !estante) {
      throw new Error({ status: 400, error: 'Missing Fields' });
    }

    return Models.Categoria.create(params);
  },
};
