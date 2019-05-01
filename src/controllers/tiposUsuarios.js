import services from '../services';

export default {
  hi(req, res) {
    res.status(200).json({
      hello: 'world',
    });
  },
  async create(req, res) {
    const { nombre, display } = req.parsedBody;
    const tipoUsuario = await services.tipoUsuario.create({ nombre, display });
    res
      .status(200)
      .json({ tipoUsuario });
  },
};
