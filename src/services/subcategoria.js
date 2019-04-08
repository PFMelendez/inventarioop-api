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

  create: async (params) => {
    const { descripcion, categoria: catId } = params;
    if (!descripcion || !catId) {
      throw new Error('Missing Fields');
    }

    const subCategoria = await Models.Subcategoria.create({ descripcion });

    console.log(subCategoria);

    const categoria = await Models.Categoria.findByPk(catId);
    await subCategoria.setCategoria(categoria);

    return Models.Subcategoria.findByPk(subCategoria.id, {
      include: [
        { all: true },
      ],
    });
  },
};
