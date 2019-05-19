import { Router } from 'express';
import controllers from '../controllers';

const { objetos } = controllers;
const api = Router();

// api.get('/:id', objetos.get);

api.post('/', objetos.create);

api.get('/', objetos.find);

api.get('/release', objetos.getDonate);

api.post('/release', objetos.postDonate);

api.put('/:id', objetos.update);

export default api;
