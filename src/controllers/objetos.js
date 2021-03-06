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
        .json({ error: 'create objetos', err });
    }
  },

  async createFile(req, res) {
    const params = req.parsedBody;

    try {
      const objeto = await services.objetos.createFile(params, req.file);

      res
        .status(201)
        .json({ objeto });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: 'create objetos', err });
    }
  },

  async get(req, res) {
    try {
      const objeto = await services.objetos.get(req.params.id);

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
      console.log(req.parsedBody);
      const objetos = await services.objetos.find(req.parsedBody);

      res.status(202).json({
        objetos,
      });
    } catch (err) {
      console.log(err);
      res.status(501).json({
        error: 'No se encontraron objetos.',
        err,
      });
    }
  },

  async getDonate(req, res) {
    try {
      const objetos = await services.objetos.getDonate(req.parsedBody.page);

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
      await services.objetos.postDonate(req.parsedBody);

      // eslint-disable-next-line
      const objetos = await Promise.all(req.parsedBody.objetos.map(async item => services.objetos.get(item)));

      res.status(202).json({
        objetos,
      });
    } catch (err) {
      console.log(err);
      res.status(501).json({
        error: 'No fue posible .',
        err,
      });
    }
  },

  async update(req, res) {
    try {
      const objetos = await services.objetos.update(req.params.id, req.parsedBody);

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
