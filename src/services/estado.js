import Models from '../models';

export default {
  create: async params => Models.TipoUSuario.create(params),
};
