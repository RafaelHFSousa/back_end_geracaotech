const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      // === Não incluímos o password_hash aqui diretamente =====
      password_hash: DataTypes.STRING,

      // Este é um campo "virtual", ele não existe no banco de dados.
      // Usaremos ele para receber a senha do usuário no momento do cadastro.
      password: {
        type: DataTypes.VIRTUAL,
        defaultValue: '',
      },
    }, {
      sequelize,
      modelName: 'User', // Colocando o nome no modelo
    });

    // Hook 'beforeSave': é executado automaticamente antes de um usuário
    // ser salvo (criado ou atualizado) no banco.
    this.addHook('beforeSave', async (user) => {
      // Se o campo 'password' foi preenchido, significa que estamos
      // criando um novo usuário ou atualizando a senha.
      if (user.password) {
        // Gera o hash da senha e armazena no campo 'password_hash'
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // Este método de instância nos ajuda a verificar se a senha enviada
  // pelo usuário no login bate com o hash salvo no banco.
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = User;