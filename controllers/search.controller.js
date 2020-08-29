const { response, request } = require('express');

const User = require('../models/user.model');
const Article = require('../models/article.model');


const getByCollection = async (req, res = response) => {

    const collection = req.params.table;
    const text = req.params.text;
    const param = req.params.param;
    const regexp = new RegExp(text, 'i');
    
    let data = [];

    try {

        switch(collection){
            case 'users':
                if(param === 'all'){
                    data = await User.find(
                        { $or: [{name:regexp}, {surname: regexp}, {id: regexp} ] }
                    )
                }else{
                    data = await User.find(
                        { $and: [{role:role}, {$or: [{name:regexp}, {surname: regexp}, {role: regexp}, {id: regexp}]}]  }
                    )
                }

            break;
            case 'articles':
                if(param === 'all'){
                    data = await Article.find({title: regexp});
                }else{
                    data = await Article.find({ $and: [{category: param}, {title: regexp}] });
                }
            break;
            case 'clients':
                
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