import { DataTypes, Sequelize } from 'sequelize';
import productModel from './products.model';
import userModel from './user.model';
const reviewsModel = (sequelize: Sequelize) => {


const Review = sequelize.define('review', {
    product_id: {
      type: DataTypes.INTEGER,
    },
    user_id:{
        type: DataTypes.INTEGER,
    },
    rating: {
      type: DataTypes.DECIMAL(10,2),
    },
    description: {
      type: DataTypes.STRING,
    },
  });
 
  
  return Review;
}
  export default reviewsModel;
  