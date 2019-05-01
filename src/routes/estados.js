import { Router } from 'express';
import controllers from '../controllers';

const { estados } = controllers;
const api = Router();

api.get('/', estados.getAll);

api.post('/', estados.create);

export default api;
