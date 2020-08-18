
const { response } = require('express');

const { validationResult } = require('express-validator');


const validateData = (req, res = response, next) => {

    const errors = validationResult(req);

    console.log(errors.mapped())

    if(!errors.isEmpty()){
        return res.status(500).json({
            ok: false,
            error: errors.mapped()
        })
    };

    next();

}

module.exports = { validateData };