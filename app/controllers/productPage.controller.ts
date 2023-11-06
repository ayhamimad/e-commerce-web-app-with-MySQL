import db from '../models';
import { Request, Response } from 'express';
import { Op ,Sequelize } from 'sequelize';
const Product = db.product;
const Reviews = db.review;
const User = db.user;

// get the product information 
export const productInfo = async (req:Request,res:Response) => {
    try {
        const { productId } = req.params;
        console.log(`Received product ID: ${productId}`);

        const product = await Product.findByPk(productId);
        const {count}  = await Reviews.findAndCountAll({where : {product_id : productId}});  
        product.ratingCount = count
        if (product) {
            const productInfo = {
                ...product.toJSON(), // Converts the Sequelize model to a plain JavaScript object
                ratingCount: count,
            };
            res.status(200).json({product: productInfo});
        }
        else{
            res.status(404).json({
                message : "product not found"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error', details : error});
    }
};

export const productRelated = async (req:Request , res:Response) => {
    try {
        const randomProducts = await Product.findAll({
            order: db.sequelize.random(),
            limit: 5,
        });

        if (randomProducts.length > 0) {
            res.status(200).json(randomProducts);
        }
        else{
            res.status(404).json({message : "No products found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error', details : error});
    }
}



// get all the reviews of an product
export const productReviews = async (req :Request , res:Response) => { 
    try {
        const {productId} = req.params;

        const reviews = await Reviews.findAll({
            where: { product_id: productId },
            include: [
              {
                model: User,
                attributes: [[Sequelize.fn('CONCAT', Sequelize.col('first_name'), ' ', Sequelize.col('last_name')), 'full_name']],
              },
            ],
          });

        if (reviews.length > 0) {
            res.status(200).json({reviews :reviews});
        }
        else{
            res.status(404).json({message:`There is no reviews for this product ${productId}`});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error', details : error});
    }
};

// export const addProductToCart

