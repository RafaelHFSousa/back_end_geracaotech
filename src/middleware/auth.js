
const jwt = require('jsonwebtoken');
const { promisify } = require('util'); // Transforma funções de callback em async/await
const authConfig = require('../config/auth');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Verifica se o token foi enviado na requisição
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  // 2. O token vem no formato "Bearer [token]". Vamos separar as duas partes.
  const [, token] = authHeader.split(' ');

  try {
    // 3. Verifica se o token é válido
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

   
    req.userId = decoded.id;

    // 5. Libera a requisição para continuar para o próximo middleware ou controller
    return next();

  } catch (err) {
    // Se jwt.verify der erro (token expirado, assinatura inválida, etc.)
    return res.status(401).json({ error: 'Token inválido.' });
  }
};