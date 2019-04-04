import { Router } from 'express';
import { tags } from '../controllers';

const api = Router();

api.get('/', tags.hi);

api.post('/', tags.hi);

api.get('/:id', tags.hi);

api.put('/:id', tags.hi);

api.delete('/:id', tags.hi);

export default api;