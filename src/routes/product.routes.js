const { Router } = require('express');
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middleware/auth');

const routes = new Router();

// Rotas Públicas
routes.get('/products', ProductController.listar);
routes.get('/products/:id', ProductController.listarId);

// Middleware de autenticação para as rotas abaixo
routes.use(authMiddleware);

// Rotas Protegidas
routes.post('/products', ProductController.criar);
routes.put('/products/:id', ProductController.atualizar);
routes.delete('/products/:id', ProductController.deletar);

module.exports = routes;