import { Router } from 'express';
// import multer from 'multer';
import controllers from '../controllers';

// const upload = multer();
const { objetos } = controllers;
const api = Router();


// api.post('/picture', upload.single('foto'), objetos.createFile);

api.get('/release', objetos.getDonate);
api.post('/release', objetos.postDonate);

api.get('/:id', objetos.get);
api.put('/:id', objetos.update);

api.post('/', objetos.create);
api.get('/', objetos.find);

export default api;
