import services from '../services';

export default {
  hi(req, res) {
    res.status(200).json({
      hello: 'objetos',
    });
  },

  async create(req, res) {
    const params = req.parsedBody;

    try {
      const objeto = await services.objetos.create(params);

      res
        .status(201)
        .json({ objeto });
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Interrnal Server Error' });
    }
  },

  async get(req, res) {
    const params = req.parsedBody;
    const {
      id_objeto
    } = params;
    try {
      const objeto = await services.objetos.get(id_objeto);

      res
        .status(201)
        .json({ objeto });
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Interrnal Server Error' });
    }
  },
};
