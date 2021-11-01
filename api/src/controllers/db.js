const Sequelize = require('sequelize');

const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASSWORD || '123456';
const database = process.env.DB_NAME || 'cnabBycoders';
const port = process.env.DB_PORT || '3306';
const host = process.env.DB_HOST || 'localhost';

const sequelize = new Sequelize(
        database, user, password, {
            dialect: 'mysql',
            host: host,
            port: port,
            operatorAlias:false,
            logging:false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
    );
    
module.exports = sequelize;