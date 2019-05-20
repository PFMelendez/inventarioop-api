import { Router } from 'express';
// import multer from 'multer';
import controllers from '../controllers';

// const upload = multer();
const { objetos } = controllers;
const api = Router();

// api.get('/:id', objetos.get);

// api.post('/picture', upload.single('foto'), objetos.createFile);

api.post('/', objetos.create);

api.get('/', objetos.find);

api.get('/release', objetos.getDonate);

api.post('/release', objetos.postDonate);

api.put('/:id', objetos.update);

export default api;
