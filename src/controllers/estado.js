import services from '../services';

export default {
  hi(req, res) {
    res.status(200).json({
      hello: 'world',
    });
  },
  async create(req, res) {
    const { params } = req;
    const estado = await services.estado.create(params);
    res
      .status(200)
      .json({ estado });
  },
};
