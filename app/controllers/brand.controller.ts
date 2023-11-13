import db from "../models";
import { Request, Response } from "express";

const Brand = db.brand;

export const showBrands = async (req: Request, res: Response) => {
    try {
    let brands = await Brand.findAll();
    return res.status(200).json({brands});
    } catch (error) {
        console.log('Error getting all Brands', error);
        return res.status(500).send("Server Error");
        };
};