import { DataTypes, Sequelize } from 'sequelize';
import productModel from './products.model';
import userModel from './user.model';

const reviewsModel = (sequelize: Sequelize) => {
  const Review = sequelize.define('review', {
    product_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    rating: {
      type: DataTypes.DECIMAL(10,2),
    },
    description: {
      type: DataTypes.STRING,
    },

  });

  Review.belongsTo(productModel(sequelize), {
    foreignKey: 'product_id',
  });

  Review.belongsTo(userModel(sequelize), {
    foreignKey: 'user_id',
  });

  return Review;
};

export default reviewsModel;
