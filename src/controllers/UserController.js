const User = require('../models/User');

class UserController {
  /**
   * Método para CRIAR um novo usuário.
   */
  async store(req, res) {
    try {
      // 1. Validação: Verifica se o e-mail já está em uso
      const userExists = await User.findOne({ where: { email: req.body.email } });

      if (userExists) {
        return res.status(400).json({ error: 'Este e-mail já está em uso.' });
      }

      // 2. Criação: Cria o usuário no banco de dados

      // O campo 'password' virtual do model irá acionar o hook para fazer o hash
      const newUser = await User.create(req.body);

      // 3. Resposta: Retorna os dados do usuário criado, sem a senha
      const { id, name, email } = newUser;
      return res.status(201).json({ id, name, email });

    } catch (error) {
      // Tratamento de erro.
      return res.status(500).json({ error: 'Houve um erro interno no servidor.', details: error.message });
    }
  }
}

module.exports = new UserController();