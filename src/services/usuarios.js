import Models from '../models';

export default {
  create: async (params) => {
    const {
      nombre, apellidos, correo, nombre_usuario, contrasena,
    } = params;

    if (!nombre || !apellidos || !correo || !nombre_usuario || !contrasena) {
      throw new Error({ status: 400, message: 'Bad Request. Missing Fields' });
    }

    const createParams = { ...params };
    delete createParams.tipo_usuario;

    return Models.Usuario.create(createParams);
  },
  assignType: async (user, type) => user.setTipoUsuario(type),
  get: async (userId) => {
    const user = await Models.Usuario.findByPk(userId, {
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
      qry.nombre_usuario = credentials.user;
    }

    const user = await Models.Usuario.findOne({
      where: qry,
      include: [
        { all: true },
      ],
    });

    const flag = (user.contrasena === credentials.contrasena);
    delete user.contrasena;

    if (!flag) {
      throw new Error('No match');
    }

    return user;
  },
};
