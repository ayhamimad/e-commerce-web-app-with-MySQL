import  { Application, Request, Response } from 'express';
const express = require('express');
const bodyParser =  require('body-parser');
const cors = require ('cors');
import db from './app/models';
import productRouter from "./app/routers/product.route";

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();

// app.get('/', (req: Request, res: Response) => {
//     res.json({ message: 'welcome!!!!' });
// });

app.use('/api/v1/products', productRouter);

const Port = process.env.PORT || 3000;
app.listen(Port, () => {
    console.log(`Server is running on ${Port}`);
});
