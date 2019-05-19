import { Router } from 'express';
import controllers from '../controllers';

const { categorias } = controllers;
const api = Router();

api.get('/', categorias.getAll);

api.post('/', categorias.create);

api.get('/:id', categorias.find);

export default api;
