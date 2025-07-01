const { Router } = require('express');

// Importa todos os arquivos de rotas da aplicação
const userRoutes = require('./user.routes');
const sessionRoutes = require('./session.routes');
const categoryRoutes = require('./category.routes');
const productRoutes = require('./product.routes');

const routes = new Router();

// Agrupa as rotas
routes.use(userRoutes);
routes.use(sessionRoutes);
routes.use(categoryRoutes);
routes.use(productRoutes);

module.exports = routes;