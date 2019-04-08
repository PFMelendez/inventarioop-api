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
};
