import Models from '../models';

export default {
  getAll: async () => {
    const subcategorias = await Models.Subcategoria.findAll({
      include: [
        { all: true },
      ],
    });

    return subcategorias;
  },
};
