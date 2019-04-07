import services from '../services';

export default {
  hi(req, res) {
    res.status(200).json({
      hello: 'world',
    });
  },

  async create(req, res) {
    const params = req.parsedBody;

    try {
      const rawUser = await services.usuarios.create(params);
      await services.usuarios.assignType(rawUser, req.parsedBody.tipo_usuario);
      const user = await services.usuarios.get(rawUser.id_usuarios);


      res
        .status(201)
        .json({ user });
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Interrnal Server Error' });
    }
  },

  async login(req, res) {
    try {
      const user = await services.usuarios.secureCompare(req.parsedBody);
      res
        .status(200)
        .json({ user });
    } catch (err) {
      res
        .status(403)
        .json({ error: 'No match for username/password credentials' });
    }
  },
};
