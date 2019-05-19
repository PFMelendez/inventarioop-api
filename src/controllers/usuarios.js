import services from '../services';

export default {
  hi(req, res) {
    res.status(200).json({
      hello: 'world',
    });
  },

  async create(req, res) {
    const params = req.parsedBody;
    console.log(params);

    try {
      const rawUser = await services.usuarios.create(params);
      console.log('Pasa');
      await services.usuarios.assignType(rawUser, req.parsedBody.tipoUsuario);
      console.log('Pasa2');
      const usuario = await services.usuarios.get(rawUser.id);
      console.log('Pasa3');


      res
        .status(201)
        .json({ usuario });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: 'Interrnal Server Error', err });
    }
  },

  async login(req, res) {
    try {
      const user = await services.usuarios.secureCompare(req.parsedBody);
      res
        .status(200)
        .json({ user });
    } catch (err) {
      res
        .status(403)
        .json({ error: 'No match for username/password credentials' });
    }
  },

  async getAll(req, res) {
    try {
      const usuarios = await services.usuarios.getAll(req.parsedBody.page);
      res
        .status(200)
        .json({ usuarios });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ err });
    }
  },

  async get(req, res) {
    try {
      const usuario = await services.usuarios.get(req.params.id);
      res
        .status(200)
        .json({ usuario });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ err });
    }
  },

  async edit(req, res) {
    try {
      const usuarios = await services.usuarios.update(req.params.id, req.parsedBody);
      res
        .status(200)
        .json({ usuarios });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ err });
    }
  },

  async delete(req, res) {
    try {
      await services.usuarios.delete(req.params.id);
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ err });
    }
  },
};
