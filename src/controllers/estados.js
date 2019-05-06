import services from '../services';

export default {
  hi(req, res) {
    res.status(200).json({
      hello: 'world',
    });
  },
  async getAll(req, res) {
    try {
      const estados = await services.estados.getAll();

      res.status(201).json({
        estados,
      });
    } catch (err) {
      res.status(500).json({
        error: 'No fue posible obtener los estados',
      });
    }
  },

  async create(req, res) {
    const estado = await services.estados.create(req.parsedBody);
    res
      .status(200)
      .json({ estado });
  },
};
