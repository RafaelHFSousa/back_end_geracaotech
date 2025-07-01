const { Router } = require('express');
const CategoryController = require('../controllers/CategoryController');
const authMiddleware = require('../middleware/auth');

const routes = new Router();

// Rotas Públicas (GET)
routes.get('/categories', CategoryController.listar);
routes.get('/categories/:id', CategoryController.buscarId);

// A partir daqui, todas as rotas precisam de autenticação
routes.use(authMiddleware);

// Rotas Protegidas (POST, PUT, DELETE)
routes.post('/categories', CategoryController.criar);
routes.put('/categories/:id', CategoryController.atualizar);
routes.delete('/categories/:id', CategoryController.deletar);

module.exports = routes;