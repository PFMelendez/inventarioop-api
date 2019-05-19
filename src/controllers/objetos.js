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
      console.log(err);
      res
        .status(500)
        .json({ error: 'create objetos' });
    }
  },

  async get(req, res) {
    const params = req.parsedBody;
    const {
      id_objeto,
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

  async find(req, res) {
    try {
      const objetos = await services.objetos.find(req.parsedBody);

      res.status(202).json({
        objetos,
      });
    } catch (err) {
      console.log(err);
      res.status(501).json({
        error: 'No se encontraron objetos.',
      });
    }
  },

  async getDonate(req, res) {
    try {
      const objetos = await services.objetos.getDonate();

      res.status(202).json({
        objetos,
      });
    } catch (err) {
      console.log(err);
      res.status(501).json({
        error: 'No se encontraron objetos.',
      });
    }
  },

  async postDonate(req, res) {
    try {
      const objetos = await services.objetos.postDonate(req.parsedBody);

      res.status(202).json({
        objetos,
      });
    } catch (err) {
      console.log(err);
      res.status(501).json({
        error: 'No fue posible .',
      });
    }
  },

  async update(req, res) {
    try {
      const objetos = await services.objetos.update(req.parsedBody);

      res.status(202).json({
        objetos,
      });
    } catch (err) {
      console.log(err);
      res.status(501).json({
        error: 'No fue posible .',
      });
    }
  },
};
