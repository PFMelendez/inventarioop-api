import { Router } from 'express';
import controllers from '../controllers';

const { subcategorias } = controllers;
const api = Router();

api.get('/', subcategorias.getAll);

api.post('/', subcategorias.create);

api.get('/:id', subcategorias.hi);

api.put('/:id', subcategorias.hi);

api.delete('/:id', subcategorias.hi);

export default api;
