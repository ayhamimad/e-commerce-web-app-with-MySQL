import db from "../models";
import { Request, Response } from "express";
import { Op, Sequelize } from "sequelize";
import { hashSync, compareSync } from "bcrypt";

const User = db.user;

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const user = req.user as typeof User;
    const userInfo = await User.findByPk(user.id, {
      attributes: ["id", "first_name", "last_name", "email", "phone_number"],
    });

    if (!userInfo) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

export const updateUserInfo = async (req: Request, res: Response) => {
    try {
      const user = req.user as typeof User;
      const { first_name, last_name, email, phone_number } = req.body;
  
      // Find the user by ID
      const userInfo = await User.findByPk(user.id);
  
      if (!userInfo) {
        return res.status(404).json({ message: "User not found" });
      }
      const originalUserInfo = {      
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        email: userInfo.email,
        phone_number: userInfo.phone_number, 
    };
  
      await userInfo.update({
        first_name,
        last_name,
        email,
        phone_number,
      });
  
      const updatedUserInfo = await User.findByPk(user.id, {
        attributes: [ 'first_name', 'last_name', 'email', 'phone_number'],
      });

      const hasUpdates = JSON.stringify(originalUserInfo) !== JSON.stringify(updatedUserInfo);
  
      if (hasUpdates) {
        return res.status(200).json({ message: "User information updated successfully", updatedUserInfo });
      } else {
        return res.status(200).json({ message: "No updates were made to user information" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error", details: error });
    }
  };
  

  export const updatePassword  = async (req:Request,res:Response) => { 
    try {
        const user = req.user as typeof User;
        const { currentPassword , newPassword} = req.body;

        const userInfo = await User.findByPk(user.id);
        if(!userInfo){
            return res.status(404).json({message:"User not Found"});
        }
        
        if (compareSync(currentPassword, userInfo.password)) {
            const newHashedPassword = hashSync(newPassword, 10);
            await userInfo.update({ password : newHashedPassword });
            return res.status(200).json({message:"Password changed Successfully"})
          }else{
            return res.status(403).json({message:"Current Password is incorrect"})
          }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error",details:error});
    }
  }; 