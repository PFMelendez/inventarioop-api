import { Router } from 'express';
import { categorias } from '../controllers';

const api = Router();

api.get('/', categorias.hi);

api.post('/', categorias.hi);

api.get('/:id', categorias.hi);

api.put('/:id', categorias.hi);

api.delete('/:id', categorias.hi);

export default api;