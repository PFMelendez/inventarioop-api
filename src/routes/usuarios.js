import { Router } from 'express';
import controllers from '../controllers';

const { usuarios } = controllers;
const api = Router();

api.get('/', usuarios.getAll);

api.post('/', usuarios.create);

api.post('/login', usuarios.login);

api.get('/:id', usuarios.get);

api.put('/:id', usuarios.edit);

api.delete('/:id', usuarios.delete);

export default api;
