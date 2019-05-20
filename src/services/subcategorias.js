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
    const { categoria: categoriaId, page } = params;
    const offset = 10 * parseInt(page, 10);
    if (!categoriaId || categoriaId === '0') {
      return Models.Subcategorias.findAll({
        offset,
        limit: 10,
        include: [
          { all: true },
        ],
      });
    }

    const categoria = await Models.Categorias.findByPk(categoriaId);


    return categoria.getSubcategorias({
      offset,
      limit: 10,
      include: [
        { all: true },
      ],
    });
  },

  create: async (params) => {
    const { descripcion, categoria: catId, seccion } = params;
    if (!descripcion || !catId || !seccion) {
      throw new Error('Missing Fields');
    }

    const subCategoria = await Models.Subcategorias.create({ descripcion, seccion });

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
