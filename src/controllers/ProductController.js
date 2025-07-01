const { Product, Category } = require('../models');

class ProductController {
  
  //  Cria um novo produto (Rota Protegida)
  
  async criar(req, res) {
    const { name, description, price, category_id } = req.body;

    if (!name || !price || !category_id) {
        return res.status(400).json({ error: 'Nome, preço e ID da categoria são obrigatórios.' });
    }

    try {
      // Valida se a categoria existe
      const category = await Category.findByPk(category_id);
      if (!category) {
        return res.status(400).json({ error: 'Categoria não encontrada.' });
      }

      const product = await Product.create({ name, description, price, category_id });
      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  
    // Lista todos os produtos (Rota Pública)
   
  async listar(req, res) {
    try {
      const products = await Product.findAll({
        order: [['name', 'ASC']],
        include: { // Inclui os dados da categoria de cada produto
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      });
      return res.json(products);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  
  //  Mostra um produto específico (Rota Pública)
   
  async listarId(req, res) {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      });

      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }

      return res.json(product);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  
  //  Atualiza um produto (Rota Protegida)
   
  async atualizar(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);

      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }

      // Se o usuário tentar mudar a categoria, valida se a nova categoria existe
      const { category_id } = req.body;
      if (category_id) {
        const categoryExists = await Category.findByPk(category_id);
        if (!categoryExists) {
          return res.status(400).json({ error: 'Nova categoria não encontrada.' });
        }
      }

      await product.update(req.body);
      return res.json(product);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  
  //  Deleta um produto (Rota Protegida)
   
  async deletar(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);

      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }

      await product.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}

module.exports = new ProductController();