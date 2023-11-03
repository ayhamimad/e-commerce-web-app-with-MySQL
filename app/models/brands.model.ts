import { DataTypes, Sequelize } from 'sequelize';

import productModel from './products.model';

const brandModel = (sequelize: Sequelize) => {
const Brand = sequelize.define('brand', {
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
Brand.hasMany(productModel(sequelize), {
  foreignKey: 'brandID', // This should match the foreign key in the Product model
});
return Brand;
}
export default brandModel;

