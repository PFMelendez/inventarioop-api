import { Router } from 'express';
import controllers from '../controllers';

const { objetos } = controllers;
const api = Router();

api.get('/', objetos.hi);

api.get('/abandoned', objetos.hi);

api.post('/', objetos.hi);

api.get('/:id', objetos.hi);

api.get('/:id/tags', objetos.hi);

api.put('/:id', objetos.hi);

api.delete('/:id', objetos.hi);

export default api;