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
      const subCategorias = await services.subcategorias.get(params);

      res.status(201).json({
        subCategorias,
      });
    } catch (err) {
      res.status(500).json({
        error: 'No fue posible obtener las subcategorias',
      });
    }
  },

  async create(req, res) {
    try {
      const subCategoria = await services.subcategorias.create(req.parsedBody);

      res
        .status(201)
        .json({ subCategoria });
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
