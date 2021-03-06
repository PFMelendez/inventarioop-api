import services from '../services';

export default {
  hi(req, res) {
    res.status(200).json({
      hello: 'world',
    });
  },

  async getAll(req, res) {
    try {
      const categorias = await services.categorias.getAll();

      res.status(200).json({
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
      const categoria = await services.categorias.create(req.parsedBody);

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

  async find(req, res) {
    try {
      const categoria = await services.categorias.find(req.params.id);
      res
        .status(200)
        .json({ categoria });
    } catch (err) {
      res
        .status(500)
        .json({ err });
    }
  },
};
