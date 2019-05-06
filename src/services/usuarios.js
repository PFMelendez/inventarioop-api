import Models from '../models';
import strHelpers from '../helpers/strings';

const { snakeCaseToCamelCase } = strHelpers;

export default {
  create: async (params) => {
    const {
      nombre, apellidos, correo, nombre_usuario, contrasena,
    } = params;

    if (!nombre || !apellidos || !correo || !nombre_usuario || !contrasena) {
      throw new Error({ status: 400, message: 'Bad Request. Missing Fields' });
    }

    const rawCreateParams = { ...params };
    const createParams = Object.keys(rawCreateParams).reduce((acc, item) => {
      const camelCaseKey = snakeCaseToCamelCase(item);
      acc[camelCaseKey] = rawCreateParams[item];
      return acc;
    }, {});
    delete createParams.tipo_usuario;

    return Models.Usuarios.create(createParams);
  },
  assignType: async (user, type) => user.setTipoUsuario(type),
  get: async (userId) => {
    const user = await Models.Usuarios.findByPk(userId, {
      attributes: {
        exclude: ['contrasena'],
      },
      include: [
        { all: true },
      ],
    });

    delete user.contrasena;

    return user;
  },

  secureCompare: async (credentials) => {
    const qry = {};

    if (credentials.user.indexOf('@') > 0) {
      qry.correo = credentials.user;
    } else {
      qry.nombreUsuario = credentials.user;
    }

    const userCredentials = await Models.Usuarios.findOne({
      attributes: ['id', 'contrasena'],
      where: qry,
      include: [
        { all: true },
      ],
    });

    const flag = (userCredentials.contrasena === credentials.contrasena);

    if (!flag) {
      throw new Error('No match');
    }

    const user = await Models.Usuarios.findByPk(userCredentials.id, {
      attributes: {
        exclude: ['contrasena'],
      },
      include: [
        { all: true },
      ],
    });

    return user;
  },
};
