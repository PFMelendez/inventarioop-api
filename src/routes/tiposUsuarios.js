import { Router } from 'express';
import controllers from '../controllers';

const { tiposUsuarios } = controllers;
const api = Router();

api.get('/', tiposUsuarios.getAll);

api.post('/', tiposUsuarios.create);

export default api;
