const cnabController = require("../controllers/cnab");

router = (app) =>
{   
    /**
     * @api {get} /list/ Request CNAB information
     * @apiName listCNAB
     * @apiGroup cnabController
     * @apiDescription Returns values ​​to the database and calculates account status
     *
     */
    app.get('/list', cnabController.listCNAB);

    /**
     * @api {post} /cnab/ Import CNAB information
     * @apiName importCNAB
     * @apiGroup cnabController
     * @apiDescription Import CNAB.txt to database
     * 
     * @apiHeaderExample {json} Header-Example:
     *     {
     *       "Content-Type": "application/x-www-form-urlencoded"
     *     }
     * 
     * @apiBody (file) {Files} File 
     */
    app.post('/cnab/', cnabController.importCNAB);
}

module.exports =  router