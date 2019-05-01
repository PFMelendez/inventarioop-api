import services from '../services';

export default {
  hi(req, res) {
    res.status(200).json({
      hello: 'world',
    });
  },

  async getAll(req, res) {
    try {
      const etiquetas = await services.etiqueta.getAll();

      res.status(201).json({
        etiquetas,
      });
    } catch (err) {
      res.status(500).json({
        error: 'No fue posible obtener las etiquetas',
      });
    }
  },

  async findAll(req, res) {
    try {
      const etiquetas = await services.etiqueta.findAll(req.parsedBody);

      res.status(202).json({
        etiquetas,
      });
    } catch (err) {
      console.log(err);
      res.status(501).json({
        error: 'No se encontraron etiquetas.',
      });
    }
  },

  async create(req, res) {
    try {
      const etiqueta = await services.etiqueta.create(req.parsedBody);

      res
        .status(201)
        .json({ etiqueta });
    } catch (err) {
      console.log(err);
      res.status(501).json({
        error: 'No se encontraron etiquetas.',
      });
    }
  },
};
