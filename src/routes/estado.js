import { Router } from 'express';
import controllers from '../controllers';

const { estado } = controllers;
const api = Router();

api.get('/', estado.hi);

api.post('/', estado.create);

export default api;
