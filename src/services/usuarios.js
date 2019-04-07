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

    const userCredentials = await Models.Usuario.findOne({
      attributes: ['id_usuarios', 'contrasena'],
      where: qry,
      include: [
        { all: true },
      ],
    });
    console.log('========');
    console.log(userCredentials);
    const flag = (userCredentials.contrasena === credentials.contrasena);
    console.log(flag);
    console.log('========');

    if (!flag) {
      throw new Error('No match');
    }

    const user = await Models.Usuario.findByPk(userCredentials.id_usuarios, {
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
