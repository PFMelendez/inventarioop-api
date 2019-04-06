import { Router } from 'express';
import controllers from '../controllers';

const { tags } = controllers;
const api = Router();

api.get('/', tags.hi);

api.post('/', tags.hi);

api.get('/:id', tags.hi);

api.put('/:id', tags.hi);

api.delete('/:id', tags.hi);

export default api;
