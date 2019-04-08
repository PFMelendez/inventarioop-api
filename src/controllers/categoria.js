import services from '../services';

export default {
  hi(req, res) {
    res.status(200).json({
      hello: 'world',
    });
  },

  async getAll(req, res) {
    const params = req.parsedBody;

    try {
      const categorias = await services.categoria.getAll();

      res.status(201).json({
        categorias,
      });
    } catch (err) {
      res.status(500).json({
        error: 'No fue posible obtener las categorias',
      });
    }
  },

  async create(req, res) {
    try {
      const categoria = await services.categoria.create(req.parsedBody);

      res
        .status(201)
        .json({ categoria });
    } catch (err) {
      if (err.status) {
        res
          .status(err.status)
          .json(err);
      } else {
        res
          .status(500)
          .json({ err, message: 'Internal Server Error' });
      }
    }
  },
};
