'use strict';

/*
 * user.routes.js
 * Archivo de prueba de routes de usuario
 *
 * 
 */

var userController = require('../controllers/user.controller');

module.exports.getAllUsers = function getAllUsers (req, res, next) {
  userController.getAllUsers(req.swagger.params, res, next);
};

module.exports.deleteUserById = function deleteUserById (req, res, next) {
  userController.deleteUserById(req.swagger.params, res, next);
};

module.exports.getUserById = function getUserById (req, res, next) {
  userController.getUserById(req.swagger.params, res, next);
};

module.exports.patchUserById = function patchUserById (req, res, next) {
  userController.patchUserById(req.swagger.params, res, next);
};

module.exports.postUser = function postUser (req, res, next) {
  userController.postUser(req.swagger.params, res, next);
};

module.exports.putUserById = function putUserById (req, res, next) {
  userController.putUserById(req.swagger.params, res, next);
};