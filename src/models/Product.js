const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.DECIMAL,
    }, {
      sequelize,
      modelName: 'Product',
    });
    return this;
  }

  static associate(models) {
    // === Um Produto PERTENCE A UMA Categoria (belongsTo) =====
    this.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
  }
}

module.exports = Product;