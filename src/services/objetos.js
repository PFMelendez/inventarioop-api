import Models from '../models';

export default {
  create: async (params) => {
    const {
      // estado: estadoId,
      tags: tagsIdsString,
      newTags: newTagsString,
      user_id: usuario_registro_entrada,
    } = params;

    const createParams = {
      ...params,
      usuario_registro_entrada,
    };

    delete createParams.tags;
    delete createParams.newTags;
    delete createParams.user_id;
    // delete createParams.estado;

    const newTagsNames = JSON.parse(newTagsString);
    const tagsIds = JSON.parse(tagsIdsString);

    const newTags = await Promise.all(newTagsNames.map(async item => Models.Etiqueta.create({
      nombre_etiqueta: item,
    })));
    const tags = await Promise.all(tagsIds.map(async item => Models.Etiqueta.findByPk(item)));

    const objetoSimple = await Models.Objetos.create(createParams);

    // const estado = await Models.Estado.findByPk(estadoId);

    await objetoSimple.addEtiquetas([...tags, ...newTags]);
    // await objetoSimple.setEstado(estado);


    return Models.Objetos.findByPk(objetoSimple.id_objetos, {
      include: [{ all: true }],
    });
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
