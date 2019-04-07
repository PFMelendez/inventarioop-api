import Models from '../models';

export default {
  create: async (params) => {
    console.log('Llega');
    const {
      nombre, apellidos, correo, nombre_usuario, constrasena,
    } = params;

    if (!nombre || !apellidos || !correo || !nombre_usuario || !constrasena) {
      throw new Error({ status: 400, message: 'Bad Request. Missing Fields' });
    }

    return Models.Usuario.create(params);
  },
};
