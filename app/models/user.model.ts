import { DataTypes, Sequelize } from 'sequelize';
import reviewsModel from './reviews.model';
import orderModel from './order.model';
import userAddressModel from './userAddress.model';
const userModel = (sequelize: Sequelize) => {


const User = sequelize.define('user', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  User.hasMany(reviewsModel(sequelize),{
    foreignKey: "user_id"
  });
  User.hasMany(orderModel(sequelize),{
    foreignKey: "user_id"
  });
  User.hasMany(userAddressModel(sequelize),{
    foreignKey: "user_id"
  });
  return User;
}
  export default userModel;
  