const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

// Importação dos nossos models
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');

// Cria a conexão com o banco de dados
const connection = new Sequelize(dbConfig);

// Inicializa cada model
User.init(connection);
Category.init(connection);
Product.init(connection);

// Chama o método 'associate' de cada model, se ele existir
Category.associate(connection.models);
Product.associate(connection.models);

module.exports = connection.models;