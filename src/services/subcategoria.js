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
  get: async (params) => {
    const { categoria: categoriaId } = params;
    if (!categoriaId) {
      return Models.Subcategoria.findAll({
        include: [
          { all: true },
        ],
      });
    }

    const categoria = await Models.Categoria.findByPk(categoriaId);

    return categoria.getSubcategorias();
  },
};
