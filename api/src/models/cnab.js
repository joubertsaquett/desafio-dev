
const Sequelize = require('sequelize');
const database = require('../controllers/db');

const Cnab = database.define('cnab', {
  Tipo: {
      type: Sequelize.INTEGER,
  },
  Data: {
      type: Sequelize.STRING,
  },
  Valor: {
      type: Sequelize.DECIMAL,
  },
  CPF: {
      type: Sequelize.STRING,
  },
  Cartao: {
      type: Sequelize.STRING,
  },
  Hora: {
      type: Sequelize.STRING,
  },
  DonaLoja: {
      type: Sequelize.STRING,
  },
  NomeLoja: {
      type: Sequelize.STRING,
  }
});
   
module.exports = Cnab;