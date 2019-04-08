import Models from '../models';

export default {
  create: async params => Models.Estado.create(params),
  getAll: async () => Models.Estado.findAll(),
};
