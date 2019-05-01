import { Router } from 'express';
import controllers from '../controllers';

const { etiquetas } = controllers;
const api = Router();

// api.get('/', etiquetas.getAll);

api.post('/', etiquetas.create);

api.get('/', etiquetas.findAll);

api.put('/:id', etiquetas.hi);

api.delete('/:id', etiquetas.hi);

export default api;
