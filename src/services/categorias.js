import Models from '../models';

export default {
  create: async params => Models.Categoria.create(params),
};
