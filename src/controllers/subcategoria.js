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
      const subcategorias = await services.subcategoria.getAll();

      res.status(201).json({
        subcategorias
      });
    } catch (err) {
      res.status(500).json({
        error: 'No fue posible obtener las subcategorias'
      });
    }
  },
};