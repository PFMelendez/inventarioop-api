import Models from '../models';

export default {
  create: async params => Models.Estados.create(params),
  getAll: async () => Models.Estados.findAll(),
};
