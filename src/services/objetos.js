import Models from '../models';
import strHelpers from '../helpers/strings';

const { snakeCaseToCamelCase } = strHelpers;

export default {
  create: async (params) => {
    const {
      estado: estadoId,
      tags: tagsIdsString,
      newTags: newTagsString,
      user_id: usuario_registro_entrada,
      subCategoria: subId,
    } = params;

    const rawCreateParams = {
      ...params,
      usuario_registro_entrada,
    };

    delete rawCreateParams.tags;
    delete rawCreateParams.newTags;
    delete rawCreateParams.user_id;
    delete rawCreateParams.subCategoria;
    // delete rawCreateParams.estado;

    const createParams = Object.keys(rawCreateParams).reduce((acc, item) => {
      const camelCaseKey = snakeCaseToCamelCase(item);
      acc[camelCaseKey] = rawCreateParams[item];
      return acc;
    });

    const newTagsNames = JSON.parse(newTagsString);

    const tagsIds = JSON.parse(tagsIdsString);
    const newTags = await Promise.all(newTagsNames.map(async item => Models.Etiquetas.create({
      nombreEtiqueta: item,
    })));
    const tags = await Promise.all(tagsIds.map(async item => Models.Etiquetas.findByPk(item)));

    const objetoSimple = await Models.Objetos.create(createParams);

    const subCategoria = await Models.Subcategorias.findByPk(subId);
    const estado = await Models.Estados.findByPk(estadoId);
    const usuario = await Models.Usuarios.findByPk(usuario_registro_entrada);

    await objetoSimple.addEtiquetas([...tags, ...newTags]);
    await objetoSimple.setSubcategoria(subCategoria);
    await objetoSimple.setEstado(estado);
    await objetoSimple.setUsuarioEntrada(usuario);


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
