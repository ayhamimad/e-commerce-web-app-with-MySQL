import { DataTypes, Sequelize } from "sequelize";
import productModel from "./products.model";
import userModel from "./user.model";

const wishlistModel = (sequelize: Sequelize) => {
  const Wishlist = sequelize.define("wishlist", {
    product_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  });
  Wishlist.belongsTo(productModel(sequelize), {
    foreignKey: "product_id",
  });

  Wishlist.belongsTo(userModel(sequelize), {
    foreignKey: "user_id",
  });

  return Wishlist;
};

export default wishlistModel;
