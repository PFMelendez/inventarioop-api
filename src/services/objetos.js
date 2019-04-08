import Models from '../models';

export default {
  create: async (params) => {
    const {
      tags,
      newTags,
    } = params;

    // if (!nombre_etiqueta) {
    //   throw new Error({
    //     status: 400,
    //     message: 'Bad Request. Missing Fields'
    //   });
    // }

    const createParams = {
      ...params,
      usuario_registro_entrada: 1,
      etiquetas: newTags,
    };

    delete createParams.tags;
    delete createParams.newTags;

    return Models.Objetos.create(createParams, {
      include: [{
        model: Models.Etiqueta,
        as: 'etiquetas',
      }],
    }).then((objeto) => {
      if (tags) {
        return objeto.addEtiquetas(tags.map(tag => tag.id_etiqueta)).then(() => objeto);
      }
      return objeto;
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
