import db from '../models';
import { Request, Response } from 'express';
import { Op } from 'sequelize';
const Brand = db.brand;
const Product = db.product;
export const  search = async (req: Request, res: Response) => {
    try {
      const search_term = req.query.search_term as string;
      // Check if it's a brand search by name
      const brandSearch = await Brand.findOne({
        where: {
          name: { [Op.like]: `%${search_term}%` }, // Use Op.like for a case-insensitive search
        },
      });

      if (brandSearch) {
        // If it's a brand search, send products in that brand
        const productsInBrand = await Product.findAll({
          where: {
            brandID: brandSearch.id, // Modify to use the brand name
          },
        });
        res.json(productsInBrand);
      } else {
        // Otherwise, search for the product details by name
        const productDetails = await Product.findOne({
          where: {
            name: { [Op.like]: `%${search_term}%` }, // Use Op.like for a case-insensitive search
          },
        });
        
        if (productDetails) {
          res.json(productDetails);
        } else {
          res.json({ message: 'No matching products found.' });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};