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
      const user = await services.usuarios.create(params);

      res
        .status(200)
        .json({ user });
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ error: err });
    }
  },
};
