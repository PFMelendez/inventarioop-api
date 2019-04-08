import Models from '../models';

export default {
  getAll: async () => {
    const etiqueta = await Models.Etiqueta.findAll();

    return etiqueta;
  },
};
