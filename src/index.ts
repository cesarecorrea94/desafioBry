
require('dotenv').config();
import 'reflect-metadata';
import './database/ormconfig';

import express from 'express';
import funcionarios from './app/routes/funcionariosEndpoint'
import empresas from './app/routes/empresasEndpoint'


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(funcionarios);
app.use(empresas);

app.listen(3000, () => console.log('Server started at http://localhost:3000'));

