import Models from '../models';

export default {
  create: async params => Models.TiposUsuarios.create(params),
};
