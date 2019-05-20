import { isNumber } from 'util';
import Models from '../models';
// import strHelpers from '../helpers/strings';


export default {
  create: async (params) => {
    const {
      nombre, apellidos, correo, nombreUsuario, contrasena,
    } = params;

    if (!nombre || !apellidos || !correo || !nombreUsuario || !contrasena) {
      throw new Error({ status: 400, message: 'Bad Request. Missing Fields' });
    }

    const createParams = { ...params };
    // const createParams = Object.keys(rawCreateParams).reduce((acc, item) => {
    //   const camelCaseKey = snakeCaseToCamelCase(item);
    //   acc[camelCaseKey] = rawCreateParams[item];
    //   return acc;
    // }, {});
    // delete createParams.tipoUsuario;

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

    // delete user.contrasena;

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

  getAll: async (page) => {
    if (!isNumber(parseInt(page, 10))) {
      throw new Error({
        status: 403,
        message: 'Invalid page number',
      });
    }
    const offset = 10 * parseInt(page, 10);
    const usuarios = await Models.Usuarios.findAll({
      attributes: {
        exclude: ['contrasena'],
      },
      include: [
        { all: true },
      ],
      limit: 10,
      offset,
    });

    return usuarios;
  },

  update: async (id, params) => {
    const rawUsuario = await Models.Usuarios.findByPk(id);
    const { tipoUsuario, ...updateParams } = params;

    delete updateParams.tipoUsuario;
    console.log(updateParams);
    await rawUsuario.update(updateParams);

    const usuario = await Models.Usuarios.findByPk(id);
    await usuario.setTipoUsuario(tipoUsuario);

    return Models.Usuarios.findByPk(id, {
      attributes: {
        exclude: ['contrasena'],
      },
      include: [
        { all: true },
      ],
    });
  },

  delete: async (id) => {
    const usuario = await Models.Usuarios.findByPk(id);
    await usuario.destroy();
  },
};
