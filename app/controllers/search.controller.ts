import db from '../models';
import { Request, Response } from 'express';
import { Op } from 'sequelize';
const Brand = db.brand;
const Product = db.product;
export const  search = async (req: Request, res: Response) => {
    try {
      const search_term = req.query.search_term as string;
      const resultsPerPage = 12; // Set the number of results to display per page
      const page = parseInt(req.query.page as string, 10) || 1; // Get the page number, default to 1 if not provided


      // Check if it's a brand search by name
      const brandSearch = await Brand.findOne({
        where: {
          name: { [Op.like]: `%${search_term}%` }, // Use Op.like for a case-insensitive search
        },
      });

      if (brandSearch) {
        // If it's a brand search, send products in that brand
      const { count, rows } = await Product.findAndCountAll({
        where: {
          brandID: brandSearch.id,
        },
        offset: (page - 1) * resultsPerPage,
        limit: resultsPerPage,
      });
      const totalPages = Math.ceil(count / resultsPerPage);// if if 5/2 = 2.5 if will make it 3 

      res.status(200).json({
        results: rows,
        pagination: {
          currentPage: page, // Set the current page
          totalPages: totalPages,
          resultsPerPage: resultsPerPage,
          totalResults: count,
        },
      });

      } else {
        // Otherwise, search for the product details by name
        const productDetails = await Product.findOne({
          where: {
            name: { [Op.like]: `%${search_term}%` }, // Use Op.like for a case-insensitive search
          },
        });
        
        if (productDetails) {
          res.status(200).json(productDetails);
        } else {
          res.status(404).json({ message: 'No matching products found.' });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};