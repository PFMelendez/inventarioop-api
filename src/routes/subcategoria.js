import { Router } from 'express';
import controllers from '../controllers';

const { subcategoria } = controllers;
const api = Router();

api.get('/', subcategoria.getAll);

api.post('/', subcategoria.create);

api.get('/:id', subcategoria.hi);

api.put('/:id', subcategoria.hi);

api.delete('/:id', subcategoria.hi);

export default api;
