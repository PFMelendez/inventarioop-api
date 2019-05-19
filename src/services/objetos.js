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
    }, {});

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

    console.log(objetoSimple);

    return Models.Objetos.findByPk(objetoSimple.id, {
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
  find: async (params) => {
    const {
      subcategoria,
      nombre,
      etiquetas,
    } = params;
    const { Op } = Models.Sequelize;
    const nombreLike = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : 1;
    const subcategoriaIdEqual = subcategoria ? { subcategoriaId: subcategoria } : 1;
    const etiquetasObj = etiquetas ? JSON.parse(etiquetas) : etiquetas;
    const objetos = await Models.Objetos.findAll({
      where: {
        [Op.and]: [nombreLike, subcategoriaIdEqual],
      },
      include: {
        model: Models.Etiquetas,
        as: 'Etiquetas',
      },
    });
    const objetosRes = [];
    if (etiquetasObj && objetos) {
      objetos.forEach((objeto) => {
        let etiquetaEqual = true;
        objeto.dataValues.Etiquetas.forEach((etiqueta) => {
          if (!etiquetasObj.includes(etiqueta.dataValues.id)) {
            etiquetaEqual = false;
          }
        });
        if (etiquetaEqual) {
          objetosRes.push(objeto);
        }
      });
    }
    console.log(objetosRes);
    return objetosRes;
  },
};

// function etiquetasFindById(etiquetas) {
//   let qry = []

//   etiquetas.forEach(element => {
//     qry.push({  :  }) ;
//   });

//   query = {
//     [Op.and]: [ nombreLike, subcategoriaIdEqual ],
//   }

//   return query
// }
