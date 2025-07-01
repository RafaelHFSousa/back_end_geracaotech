const { Model, DataTypes } = require('sequelize');

class Category extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Category', // nome da tabela
    });
    return this;
  }

  // Método para definir as associações (relacionamentos)
  static associate(models) {
    // 'this' refere-se ao modelo Category
    // Uma Categoria TEM MUITOS Produtos (hasMany)
    this.hasMany(models.Product, { foreignKey: 'category_id', as: 'products' });
  }
}

module.exports = Category;