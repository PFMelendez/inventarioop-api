import Models from '../models';

export default {
  create: async (params) => {
    const {
      nombre,
      etiquetas
    } = params;

    if (!nombre) {
      throw new Error({
        status: 400,
        message: 'Bad Request. Missing Fields'
      });
    }

    etiquetasArray = [];
    etiquetas.forEach(etiqueta => {
      etiquetasArray.push({
        'nombre_etiqueta': etiqueta
      });
    });

    const createParams = {
      'nombre': nombre,
      'usuario_registro_entrada': 1,
      'etiquetas': etiquetasArray,
    };

    return Models.Objetos.create(createParams, {
      include: [{
        model: db.Etiqueta,
        as: 'etiquetas'
      }]
    });
  },
  get: async (objectId) => {
    const objeto = await Models.Objetos.findByPk(objectId, {
      include: [{
        all: true
      }, ],
    });

    return objeto;
  },
};