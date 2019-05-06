import { Router } from 'express';
import controllers from '../controllers';

const { categorias } = controllers;
const api = Router();

api.get('/', categorias.getAll);

api.post('/', categorias.create);

api.get('/:id', categorias.hi);

api.put('/:id', categorias.hi);

api.delete('/:id', categorias.hi);

export default api;
