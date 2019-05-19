import services from '../services';

export default {
  hi(req, res) {
    res.status(200).json({
      hello: 'world',
    });
  },
  async create(req, res) {
    try {
      const { nombre, display } = req.parsedBody;
      const tipoUsuario = await services.tiposUsuarios.create({ nombre, display });
      res
        .status(200)
        .json({ tipoUsuario });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ err });
    }
  },
  async getAll(req, res) {
    try {
      const tiposUsuarios = await services.tiposUsuarios.getAll();
      res
        .status(200)
        .json({ tiposUsuarios });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ err });
    }
  },
};
