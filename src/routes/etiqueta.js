import { Router } from 'express';
import controllers from '../controllers';

const { etiqueta } = controllers;
const api = Router();

api.get('/', etiqueta.getAll);

api.post('/', etiqueta.create);

api.get('/:nombre', etiqueta.findAll);

api.put('/:id', etiqueta.hi);

api.delete('/:id', etiqueta.hi);

export default api;
