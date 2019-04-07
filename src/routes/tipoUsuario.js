import { Router } from 'express';
import controllers from '../controllers';

const { tipoUsuario } = controllers;
const api = Router();

api.get('/', tipoUsuario.hi);

api.post('/', tipoUsuario.create);

export default api;
