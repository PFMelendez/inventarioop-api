import Models from '../models';

export default {
  getAll: async () => {
    const subcategorias = await Models.Subcategorias.findAll({
      include: [
        { all: true },
      ],
    });

    return subcategorias;
  },
  get: async (params) => {
    const { categoria: categoriaId } = params;
    if (!categoriaId) {
      return Models.Subcategorias.findAll({
        include: [
          { all: true },
        ],
      });
    }

    const categoria = await Models.Categorias.findByPk(categoriaId);

    console.log(categoria);

    return categoria.getSubcategorias();
  },

  create: async (params) => {
    const { descripcion, categoria: catId } = params;
    if (!descripcion || !catId) {
      throw new Error('Missing Fields');
    }

    const subCategoria = await Models.Subcategorias.create({ descripcion });

    console.log(subCategoria);

    const categoria = await Models.Categorias.findByPk(catId);
    await subCategoria.setCategoria(categoria);

    return Models.Subcategorias.findByPk(subCategoria.id, {
      include: [
        { all: true },
      ],
    });
  },

  find: async id => Models.Subcategorias.findByPk(id, {
    include: [
      { all: true },
    ],
  }),
  delete: async (id) => {
    const subCategoria = await Models.Subcategorias.findByPk(id);
    await subCategoria.destroy();
  },
  update: async (id, params) => {
    const subCategoria = await Models.Subcategorias.findByPk(id);
    const updateParams = { ...params };
    if (updateParams.categoriaId) delete updateParams.categoriaId;
    await subCategoria.update({ ...params });
    return Models.Subcategorias.findByPk(id, {
      include: [
        { all: true },
      ],
    });
  },
};
