import { Router } from 'express';
import controllers from '../controllers';

const { objetos } = controllers;
const api = Router();

api.get('/:id', objetos.get);

api.post('/', objetos.create);

api.get('/', objetos.find);

api.put('/', objetos.create);

api.delete('/:id', objetos.hi);

export default api;
