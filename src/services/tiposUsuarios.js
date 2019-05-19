import Models from '../models';

export default {
  create: async params => Models.TiposUsuarios.create(params),
  getAll: async () => Models.TiposUsuarios.findAll({
    include: [
      { all: true },
    ],
  }),
};
