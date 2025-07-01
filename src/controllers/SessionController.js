const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authConfig = require('../config/auth');

class SessionController {
  /**
   * Método para criar (autenticar) uma nova sessão de usuário.
   */
  async store(req, res) {
    const { email, password } = req.body;

    // 1. Verifica se o usuário com o e-mail fornecido existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // Usamos uma mensagem genérica por segurança
      return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
    }

    // 2. Verifica se a senha está correta
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
    }

    const { id, name } = user;

    // 3. Se tudo estiver correto, gera o token JWT
    const token = jwt.sign(
      { id }, // Payload: informações que estarão dentro do token
      authConfig.secret, // Segredo para gerar o token
      { expiresIn: authConfig.expiresIn } // Opções, como o tempo de expiração
    );

    // 4. Retorna os dados do usuário e o token
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token,
    });
  }
}

module.exports = new SessionController();