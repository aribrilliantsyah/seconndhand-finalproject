'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Category, {
        foreignKey: 'category_id',
        as: 'categories'
      })
    }
  }
  Category.init({
    category: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
  });
  return Category;
};