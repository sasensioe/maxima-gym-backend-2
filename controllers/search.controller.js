const { response, request } = require('express');

const User = require('../models/user.model')


const getByCollection = async (req, res = response) => {

    const collection = req.params.table;
    const text = req.params.text;

    const regexp = new RegExp(text, 'i');

    let data = [];

    try {

        switch(collection){
            case 'users':
                data = await User.find({name: regexp});
            break;
            case 'articles':
                data = await User.find({title: regexp});
            break;
            case 'clients':
                data = await User.find({name: regexp});
            break;

            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'Collection not valid'
                })
        }

        res.status(200).json({
            ok: true,
            data
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Search failed'
        })
    }

}


module.exports = { getByCollection }