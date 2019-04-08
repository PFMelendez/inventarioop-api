import Models from '../models';

export default {
  create: async (params) => {
    const {
      tags,
      newTags,
      user_id: usuario_registro_entrada,
    } = params;

    const createParams = {
      ...params,
      usuario_registro_entrada,
      etiquetas: newTags,
    };

    delete createParams.tags;
    delete createParams.newTags;
    delete createParams.user_id;

    const newTagsIds = newTags.map(async (item) => {
      const tag = await Models.Etiqueta.create(item);
      return tag.id_etiqueta;
    });

    const objeto = await Models.Objetos.create(createParams);

    return objeto.addEtiquetas([...tags, ...newTagsIds]);
  },
  get: async (objectId) => {
    const objeto = await Models.Objetos.findByPk(objectId, {
      include: [{
        all: true,
      }],
    });

    return objeto;
  },
};
