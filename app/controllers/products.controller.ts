import db from '../models';
import { Request, Response } from 'express';
import { Op } from 'sequelize';
const Brand = db.brand;
const Product = db.product;
const Category = db.category;
const Reviews = db.review;
export const list = async (req: Request, res: Response) => {
    try{
        
        const resultsPerPage = parseInt(req.query.per_page as string, 10) || 12; // Set the number of results to display per page
        const page = parseInt(req.query.page as string, 10) || 1; // Get the page number, default to 1 if not provided

        
        const { new_arrival, category, handpicked, brand, search_term } = req.query;

        // Assuming you have an array of products stored in a variable called 'products'
        // Filter products based on query parameters

        //---------------------------------------------------new arrival -------------------------------------------------------------
        let filteredProducts;
          if (new_arrival === 'true') {
            const currentDate = new Date();
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
            
                const { count, rows } = await Product.findAndCountAll({
                    where: {
                        createdAt: {
                            [Op.gt]: threeMonthsAgo, // Products created after three months ago
                            [Op.lt]: currentDate       
                        },
                    },
                    offset: (page - 1) * resultsPerPage,
                    limit: resultsPerPage,
                  });
                  const totalPages = Math.ceil(count / resultsPerPage);// if if 5/2 = 2.5 if will make it 3 
                  const productsWithReviewCounts = [];

                  for (const product of rows) {
                    const { count: reviewCount } = await Reviews.findAndCountAll({
                      where: { product_id: product.id },
                    });


                    productsWithReviewCounts.push({
                      ...product.toJSON(), // Include the product details
                      ratingCount: reviewCount,
                    });
                  }

                  res.json({
                    results: productsWithReviewCounts,
                    pagination: {
                      currentPage: page, // Set the current page
                      totalPages: totalPages,
                      resultsPerPage: resultsPerPage,
                      totalResults: count,
                    },
                  });
          }
        

          //--------------------------------------------------category name and handpicked-----------------------------------------------
          if (category) {
            const categoryName = req.query.category as string;
            const categorySearch = await Category.findOne({
              where: {
                name: { [Op.like]: `%${categoryName}%` }, // Use Op.like for a case-insensitive search
              },
            });
          
            if (handpicked === 'true') {
              const { count, rows } = await Product.findAndCountAll({
                where: {
                  categoryID: categorySearch.id,
                  price: {
                    [Op.lt]: 100, // Products with price less than 100
                  },
                  rate: {
                    [Op.gt]: 4.5, // Products with rating greater than 4.5
                  },
                },
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
                  ...product.toJSON(), // Include the product details
                  ratingCount: reviewCount,
                });
              }

              res.json({
                results: productsWithReviewCounts,
                pagination: {
                  currentPage: page,
                  totalPages: totalPages,
                  resultsPerPage: resultsPerPage,
                  totalResults: count,
                },
              });
            } else {
              const { count, rows } = await Product.findAndCountAll({
                where: {
                  categoryID: categorySearch.id,
                },
                offset: (page - 1) * resultsPerPage,
                limit: resultsPerPage,
              });
          
              const totalPages = Math.ceil(count / resultsPerPage);
          
              res.json({
                results: rows,
                pagination: {
                  currentPage: page,
                  totalPages: totalPages,
                  resultsPerPage: resultsPerPage,
                  totalResults: count,
                },
              });
            }
          }
          
          
        //-----------------------------------------------------list brand-------------------------------------------------------------
          if (brand) {
            const branNname = req.query.brand as string;
            const brandSearch = await Brand.findOne({
                where: {
                  name: { [Op.like]: `%${branNname}%` }, // Use Op.like for a case-insensitive search
                },
            });
            const { count, rows } = await Product.findAndCountAll({
                where: {
                  brandID: brandSearch.id,
                },
                offset: (page - 1) * resultsPerPage,
                limit: resultsPerPage,
              });
              const totalPages = Math.ceil(count / resultsPerPage);// if if 5/2 = 2.5 if will make it 3 
        
              const productsWithReviewCounts = [];

              for (const product of rows) {
                const { count: reviewCount } = await Reviews.findAndCountAll({
                  where: { product_id: product.id },
                });


                productsWithReviewCounts.push({
                  ...product.toJSON(), // Include the product details
                  ratingCount: reviewCount,
                });
              }

              
              res.json({
                results: productsWithReviewCounts,
                pagination: {
                  currentPage: page, // Set the current page
                  totalPages: totalPages,
                  resultsPerPage: resultsPerPage,
                  totalResults: count,
                },
              });
          }
          


          // const resultsPerPage = 12; // Set the number of results to display per page
          // const page = parseInt(req.query.page as string, 10) || 1; // Get the page number, default to 1 if not provided
    
          //-----------------------------------------------search--------------------------------------------------------------
          if(search_term){
          const search_termName = req.query.search_term as string;
          // Check if it's a brand search by name
          const brandSearch = await Brand.findOne({
            where: {
              name: { [Op.like]: `%${search_termName}%` }, // Use Op.like for a case-insensitive search
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
    
          const productsWithReviewCounts = [];

          for (const product of rows) {
            const { count: reviewCount } = await Reviews.findAndCountAll({
              where: { product_id: product.id },
            });


            productsWithReviewCounts.push({
              ...product.toJSON(), // Include the product details
              ratingCount: reviewCount,
            });
          }
          
          res.status(200).json({
            results: productsWithReviewCounts,
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
            const {count}  = await Reviews.findAndCountAll({where : {product_id : productDetails.id}});  
            if (productDetails) {
              const productInfo = {
                ...productDetails.toJSON(), // Converts the Sequelize model to a plain JavaScript object
                ratingCount: count,
            };
              res.status(200).json(productInfo);
            } else {
              res.status(404).json({ message: 'No matching products found.' });
            }
          }            
        }


    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}