import Models from '../models';

export default {
  create: async (params) => {
    const {
      nombre, apellidos, correo, nombre_usuario, contrasena,
    } = params;

    if (!nombre || !apellidos || !correo || !nombre_usuario || !contrasena) {
      throw new Error({ status: 400, message: 'Bad Request. Missing Fields' });
    }

    return Models.Usuario.create({
      nombre, apellidos, correo, nombre_usuario, contrasena,
    });
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
};
