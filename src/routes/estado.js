import { Router } from 'express';
import controllers from '../controllers';

const { estado } = controllers;
const api = Router();

api.get('/', estado.getAll);

api.post('/', estado.create);

export default api;
