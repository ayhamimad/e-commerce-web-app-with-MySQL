import { DataTypes, Sequelize } from 'sequelize';

import productModel from './products.model';

const categorydModel = (sequelize: Sequelize) => {
const Category = sequelize.define('category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
Category.hasMany(productModel(sequelize), {
    foreignKey: 'categoryID', // This should match the foreign key in the Product model

  });
  return Category;
}
export default categorydModel;
