import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './app/models';


const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'welcome!!!!' });
});

//import bookRoutes from './app/routes/books.route';
//bookRoutes(app);

const Port = process.env.PORT || 3000;
app.listen(Port, () => {
    console.log(`Server is running on ${Port}`);
});
