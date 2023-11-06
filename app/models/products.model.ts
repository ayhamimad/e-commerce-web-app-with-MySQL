import { DataTypes, Sequelize } from 'sequelize';
import orderItemModel from './orderItem.model';
import reviewsModel from "./reviews.model";
const productModel = (sequelize: Sequelize) => {
  const Product = sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    short_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    brandID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Product.hasMany(orderItemModel(sequelize), {
  //   foreignKey: "productID",
  // });

  // Product.hasMany(reviewsModel(sequelize), {
  //   foreignKey: "product_id",
  // });

  return Product;
};

export default productModel;
