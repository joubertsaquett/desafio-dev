const Cnab = require('../models/cnab'); 


exports.importCNAB = async (req, res) => {
    if(!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    }
    let file = req.files.file;
    delete req.files.file;

    if(file.mimetype != "text/plain"){
        res.send({
            status: false,
            message: 'Extension not support.'
        });
    }
    try {
        
        // Buffer file prepare
        const buff = Buffer.from(file.data, "utf-8");
        const resultStr = buff.toString();

        //load lines
        var lines = resultStr.split(/\r?\n/);
        
        const fieldSize = [
            {name: 'Tipo', init: 0, end: 1},
            {name: 'Data', init: 1, end: 9},
            {name: 'Valor', init: 9, end: 19},
            {name: 'CPF', init: 19, end: 30},
            {name: 'Cartao', init: 30, end: 42},
            {name: 'Hora', init: 42, end: 48},
            {name: 'DonaLoja', init: 48, end: 62},
            {name: 'NomeLoja', init: 62, end: 81},
        ]

        let bind = [];
        lines.forEach(el => {
            if(el == ''){
                return;
            }
            const registry = {
                [fieldSize[0].name]: el.substring(fieldSize[0].init, fieldSize[0].end),
                [fieldSize[1].name]: el.substring(fieldSize[1].init, fieldSize[1].end),
                [fieldSize[2].name]: el.substring(fieldSize[2].init, fieldSize[2].end) / 100.00,
                [fieldSize[3].name]: el.substring(fieldSize[3].init, fieldSize[3].end),
                [fieldSize[4].name]: el.substring(fieldSize[4].init, fieldSize[4].end),
                [fieldSize[5].name]: el.substring(fieldSize[5].init, fieldSize[5].end),
                [fieldSize[6].name]: el.substring(fieldSize[6].init, fieldSize[6].end),
                [fieldSize[7].name]: el.substring(fieldSize[7].init, fieldSize[7].end)
            }
            bind.push(registry);
        });

        Cnab.bulkCreate(bind).then(() => {
            return Cnab.findAll();
        }).then(cnab => {
            res.status(200).send(
                {
                    method: 'post - /cnab',
                    success: true,
                    result: cnab
                }
            );
        })
    } catch (err) {
        console.error(err);
    }
}

exports.listCNAB = async (req, res) => {
    try {
        
        let result = {
            Saldo: 0,
            transations: []
        }

        const plus =  [1,4,5,6,7,8]
        const minus =  [2,3,9]
        
        let plusResult = 0;
        let minusResult = 0;

        const cnab = await Cnab.findAll();
        cnab.forEach( 
            (line) => {
                
                result.transations.push(line.dataValues)

                if(plus.includes(line.dataValues.Tipo)){
                    plusResult += Number(line.dataValues.Valor);
                } else {
                    minusResult += Number(line.dataValues.Valor);
                }
            }
        );
        
        result.Saldo = plusResult - minusResult;

        res.status(200).send(
            {
                method: 'get - /list',
                success: true,
                result
            }
        );
        
    } catch (error) {
        console.log(error);
    }
    
}