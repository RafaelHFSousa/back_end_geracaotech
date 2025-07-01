const express = require('express');
const routes = require('./routes');
require('./models'); // Importa o index.js dos models


class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // Permite que o servidor entenda requisições com corpo em formato JSON
    this.server.use(express.json());
  }

  routes() {
    // Adicione um endpoint de teste inicial
    this.server.use(routes)
    
    this.server.get('/', (req, res) => {
        return res.json({ mensagem: 'API funcionando!' });
    });
  }
}

module.exports = new App().server;