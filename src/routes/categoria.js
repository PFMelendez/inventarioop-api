import { Router } from 'express';
import controllers from '../controllers';

const { categoria } = controllers;
const api = Router();

api.get('/', categoria.getAll);

api.post('/', categoria.create);

api.get('/:id', categoria.hi);

api.put('/:id', categoria.hi);

api.delete('/:id', categoria.hi);

export default api;
