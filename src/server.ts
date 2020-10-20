import express from 'express';
import cors from 'cors';
import path from 'path';
import 'dotenv/config';
import 'express-async-errors';

// import bodyParser from 'body-parser';
import './database/connection';

import routes from './routes';
import errorHandler from './Errors/handler';

const app = express();

// app.use(cors({ origin: 'https://happy-app-frontend.netlify.app' }));
app.use(cors());

app.use(express.json());

app.use(routes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(errorHandler);

const port = process.env.PORT || 3333;
app.listen(port, () => console.log('Server is running on port: ' + port));
