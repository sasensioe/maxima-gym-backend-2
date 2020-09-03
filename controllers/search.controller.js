const { response, request } = require('express');

const moment = require('moment');

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
                        { $and: [{role:param}, {$or: [{name:regexp}, {surname: regexp}, {role: regexp}, {id: regexp}]}]  }
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

const searchArticles = async(req, res) => {

    const text = req.params.text;
    const category = req.params.category;
    const days = req.params.days;
    const regexp = new RegExp(text, 'i');

    const dateNow = moment()
    const dateFrom = moment().subtract(days,'d');


    if(category === 'all'){

        if(days === 'all'){
            const [ articles, total ] = await Promise.all([
                Article.find({title: regexp})
                    .sort({date: -1}),
                Article.countDocuments({title: regexp})
            ]);
            return res.json({
                ok: true,
                articles,
                total
            })
        }else{
            const [ articles, total ] = await Promise.all([
                Article.find({$and: [{title: regexp}, {"date": {"$gte": Date.parse(dateFrom), "$lt": Date.parse(dateNow)}}]})
                    .sort({date: -1}),
                Article.countDocuments({$and: [{title: regexp}, {"date": {"$gte": Date.parse(dateFrom), "$lt": Date.parse(dateNow)}}]})
            ]);
            return res.json({
                ok: true,
                articles,
                total
            })
        }
    }else{
        if(days === 'all'){
            const [ articles, total ] = await Promise.all([
                Article.find({$and: [{title: regexp}, {category: category}]})
                    .sort({date: -1}),
                Article.countDocuments({$and: [{title: regexp}, {category: category}]})
            ]);
            return res.json({
                ok: true,
                articles,
                total
            })
        }else{
            const [ articles, total ] = await Promise.all([
                Article.find({$and: [{title: regexp}, { "date": {"$gte": Date.parse(dateFrom), "$lt": Date.parse(dateNow)} }, { category: category }]})
                    .sort({date: -1}),
                Article.countDocuments({$and: [{title: regexp}, { "date": {"$gte": Date.parse(dateFrom), "$lt": Date.parse(dateNow)} }, { category: category }]})
            ]);
            return res.json({
                ok: true,
                articles,
                total
            })
        }
    }

}


module.exports = { getByCollection, searchArticles }