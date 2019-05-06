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

  async find(req, res) {
    try {
      const subCategoria = await services.subcategorias.create(req.params.id);

      res
        .status(200)
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

  async edit(req, res) {
    try {
      const subCategoria = await services.subcategorias.update(req.params.id, req.parsedBody);

      res
        .status(200)
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

  async delete(req, res) {
    try {
      await services.subcategorias.delete(req.params.id);

      res.sendStatus(200);
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
