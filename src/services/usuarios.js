import Models from '../models';

export default {
  create: async params => Models.Usuario.create(params),
};

