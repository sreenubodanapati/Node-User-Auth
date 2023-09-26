import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/connectdb.js';
import router from './routes/route.js';

const app = express();

/** middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); 

const port = 8010;

app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});

app.use('/api', router);

connect().then(() => {
    try {
        app.listen(port, () => {
            console.log("server listing");
        })
    } catch (error) {
        console.log('not connected to server')
    }
}).catch(error => {
    console.log("Database connection failed...!");
});