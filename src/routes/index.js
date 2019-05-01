import express from 'express';
// import middlewares from '../middlewares';
import demo from './demo';
import categorias from './categorias';
import objetos from './objetos';
import subcategorias from './subcategorias';
import etiquetas from './etiquetas';
import usuarios from './usuarios';
import tiposUsuarios from './tiposUsuarios';
import estados from './estados';

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

api.use('/categoria', categorias);
api.use('/objetos', objetos);
api.use('/subcategoria', subcategorias);
api.use('/etiqueta', etiquetas);
api.use('/usuarios', usuarios);
api.use('/estado', estados);
api.use('/tipo-usuario', tiposUsuarios);

export default api;
