const { Category, Product } = require('../models');

class CategoryController {
  
  //  Rota Protegida
   
  async criar(req, res) {
    const { name } = req.body;
    console.log(name)
    if (!name) {
      return res.status(400).json({ error: 'O nome da categoria é obrigatório.' });
    }

    try {
      const category = await Category.create({ name });
      return res.status(201).json(category);
    } catch (error) {
      // Erro de validação do Sequelize
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'Esta categoria já existe.' });
      }
      // ADICIONE ESTA LINHA PARA VER O ERRO DETALHADO NO TERMINAL
      console.log(error); 
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  
  //  Lista todas as categorias (Rota Pública)
   
  async listar(req, res) {
    try {
      const categories = await Category.findAll({
        order: [['name', 'ASC']],
      });
      return res.json(categories);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  
  //  Mostra uma categoria específica e seus produtos (Rota Pública)
   
  async buscarId(req, res) {
    try {
      const category = await Category.findByPk(req.params.id, {
        include: {
          model: Product,
          as: 'products', 
          attributes: ['id', 'name', 'price'], // Pega alguns campos dos produtos
        },
      });

      if (!category) {
        return res.status(404).json({ error: 'Categoria não encontrada.' });
      }

      return res.json(category);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }


  //  Atualiza uma categoria (Rota Protegida)
  
  async atualizar(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);

      if (!category) {
        return res.status(404).json({ error: 'Categoria não encontrada.' });
      }

      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'O nome da categoria é obrigatório.' });
      }

      await category.update({ name });
      return res.json(category);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'Este nome de categoria já está em uso.' });
      }
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  
  //  * Deleta uma categoria (Rota Protegida)

  async deletar(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);

      if (!category) {
        return res.status(404).json({ error: 'Categoria não encontrada.' });
      }

      await category.destroy();
      // 204 é a resposta padrão para deletar
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}

module.exports = new CategoryController();