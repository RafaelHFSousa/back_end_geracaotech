require('dotenv').config();

module.exports = {
  // gerar o token do .env
  secret: process.env.JWT_SECRET,
  // Tempo de expiração do token
  expiresIn: '1d',
};