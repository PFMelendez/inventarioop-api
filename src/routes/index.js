import express from 'express';
// import middlewares from '../middlewares';
import demo from './demo';
import categorias from './categorias';
import objetos from './objetos';
import subcategorias from './subcategorias';
import tags from './tags';
import usuarios from './usuarios';

const { Router } = express;
const api = Router();

// internal middleware
// router.use(middlewares());

// '/api/'
api.get('/', (req, res) => {
  res.json({ hi: 'there' });
});

// '/api/_health'
api.get('/_health', (req, res) => {
  res.sendStatus(200);
});

// set routes here
api.use('/demo', demo);

api.use('/categorias', categorias);
api.use('/objetos', objetos);
api.use('/subcategorias', subcategorias);
api.use('/tags', tags);
api.use('/usuarios', usuarios);

export default api;
