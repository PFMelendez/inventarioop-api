import { Router } from 'express';
import controllers from '../controllers';

const { subcategorias } = controllers;
const api = Router();

api.get('/', subcategorias.get);

api.post('/', subcategorias.create);

api.get('/:id', subcategorias.find);

api.put('/:id', subcategorias.edit);

api.delete('/:id', subcategorias.delete);

export default api;
