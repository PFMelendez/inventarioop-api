import { Router } from 'express';
import controllers from '../controllers';

const { objetos } = controllers;
const api = Router();

api.get('/', objetos.hi);

api.post('/', objetos.create);

api.get('/:id', objetos.get);

api.put('/', objetos.create);

api.delete('/:id', objetos.hi);

export default api;
