import { Router } from 'express';
import controllers from '../controllers';

const { usuarios } = controllers;
const api = Router();

api.get('/', usuarios.hi);

api.post('/', usuarios.hi);

api.post('/session', usuarios.hi);

api.get('/:id', usuarios.hi);

api.put('/:id', usuarios.hi);

api.delete('/:id', usuarios.hi);

export default api;
