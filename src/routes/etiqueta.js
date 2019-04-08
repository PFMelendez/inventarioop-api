import { Router } from 'express';
import controllers from '../controllers';

const { etiqueta } = controllers;
const api = Router();

api.get('/', etiqueta.getAll);

api.post('/', etiqueta.hi);

api.get('/:id', etiqueta.hi);

api.put('/:id', etiqueta.hi);

api.delete('/:id', etiqueta.hi);

export default api;
