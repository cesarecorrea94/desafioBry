import { createConnection } from 'typeorm';

let ormconfig = require('./../../ormconfig.json');
ormconfig.host = process.env.DB_HOST;
ormconfig.port = process.env.DB_PORT;
ormconfig.username = process.env.DB_USERNAME;
ormconfig.password = process.env.DB_PASSWORD;
ormconfig.database = process.env.DB_DATABASE;

createConnection(ormconfig)
    .then(() => console.log('Successfully connected with database'));

