import Models from '../models';

export default {
  create: async params => Models.TipoUsuario.create(params),
};
