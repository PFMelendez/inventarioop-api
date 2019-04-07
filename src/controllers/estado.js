import services from '../services';

export default {
  hi(req, res) {
    res.status(200).json({
      hello: 'world',
    });
  },
  async create(req, res) {
    const estado = await services.estado.create(req.parsedBody);
    res
      .status(200)
      .json({ estado });
  },
};
