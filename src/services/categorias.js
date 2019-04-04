import Models from '../models';
export default {
  create: async params => {
    return await Models.Categoria.create(params);
  }
}