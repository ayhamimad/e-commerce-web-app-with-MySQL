import db from "../models";
import { Request, Response } from "express";
import { Op } from "sequelize";

const Brand = db.brand;
const Product = db.product;
const Category = db.category;
const Reviews = db.review;

export const list = async (req: Request, res: Response) => {
  try {
    const resultsPerPage = parseInt(req.query.per_page as string, 10) || 12;
    const page = parseInt(req.query.page as string, 10) || 1;

    const { category, brand, handpicked, new_arrival, search_term } = req.query;

    let whereClause = {}; // Define a base where clause

    // Handle 'category' query parameter
    if (category) {
      const categoryName = req.query.category as string;
      const categorySearch = await Category.findOne({
        where: {
          name: { [Op.like]: `%${categoryName}%` },
        },
      });

      if (categorySearch) {
        whereClause = {
          ...whereClause,
          categoryID: categorySearch.id,
        };
      }
    }

    // Handle 'brand' query parameter
    if (brand) {
      const brandName = req.query.brand as string;
      const brandSearch = await Brand.findOne({
        where: {
          name: { [Op.like]: `%${brandName}%` },
        },
      });

      if (brandSearch) {
        whereClause = {
          ...whereClause,
          brandID: brandSearch.id,
        };
      }
    }

    // Handle 'handpicked' query parameter
    if (handpicked === "true") {
      whereClause = {
        ...whereClause,
        price: {
          [Op.lt]: 100,
        },
        rate: {
          [Op.gt]: 4.5,
        },
      };
    }

    // Handle 'new_arrival' query parameter
    if (new_arrival === "true") {
      const currentDate = new Date();
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

      whereClause = {
        ...whereClause,
        createdAt: {
          [Op.gt]: threeMonthsAgo,
          [Op.lt]: currentDate,
        },
      };
    }

    // Handle 'search_term' query parameter for both brand and product names
    if (search_term) {
      const search_termName = req.query.search_term as string;

      const brandSearch = await Brand.findOne({
        where: {
          name: { [Op.like]: `%${search_termName}%` },
        },
      });

      if (brandSearch) {
        // If it's a brand search, send products in that brand
        whereClause = {
          ...whereClause,
          brandID: brandSearch.id,
        };
      } else {
        // Otherwise, search for products with a name containing the search term
        whereClause = {
          ...whereClause,
          name: { [Op.like]: `%${search_termName}%` },
        };
      }
    }

    const { count, rows } = await Product.findAndCountAll({
      where: whereClause,
      offset: (page - 1) * resultsPerPage,
      limit: resultsPerPage,
    });

    const totalPages = Math.ceil(count / resultsPerPage);
    const productsWithReviewCounts = [];

    for (const product of rows) {
      const { count: reviewCount } = await Reviews.findAndCountAll({
        where: { product_id: product.id },
      });

      productsWithReviewCounts.push({
        ...product.toJSON(),
        ratingCount: reviewCount,
      });
    }

    res.status(200).json({
      results: productsWithReviewCounts,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        resultsPerPage: resultsPerPage,
        totalResults: count,
      },
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
