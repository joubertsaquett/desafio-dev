
const   express = require("express"),
        app = express();
const helmet 	    = require('helmet');
const cors          = require('cors');
const consign       = require('consign');
const upload       = require('express-fileupload');

const database = require('./src/controllers/db');
const Cnab = require('./src/models/cnab'); 

database.sync().then(() => {
  console.log('Database connection success.');
  
  app.use(cors());
  app.use(helmet());
  app.use(upload());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true}));

  // Import routes
  consign().include('./src/routes').into(app);

}).catch(() => {
  console.log('Database connection failed.');
})


// Set port
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT,function(){ console.log('Service run port:',PORT); });

module.exports = app

