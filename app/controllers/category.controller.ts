import db from "../models";
import { Request, Response } from "express";

const Category = db.category;
const Product = db.product;
export const showCategories = async (req: Request, res: Response) => {
    try {
    let categories = await Category.findAll({
        include: [{
            model: Product,
            where: {
                rating: {
                    [db.Sequelize.Op.gt]: 4.5,
                },
                price: {
                    [db.Sequelize.Op.lt]: 100,
                },
            },
            required: true, // This ensures that only categories with matching products are included
        }],
    });
    if (!categories) throw new Error("No category found");
    return res.status(200).json({
        success: true,
        data: categories
    });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error: 'Error retrieving categories'
        })
    };
};
