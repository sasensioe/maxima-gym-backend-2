
const Article = require('../models/article.model')
const moment = require('moment');

const newArticle = async (req, res) => {

    try {

        const article = new Article({...req.body, createdBy: req.uid});

        await article.save();
    
        res.status(200).json({
            ok: true,
            msg: 'Article published',
            article
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cannot publish article'
        })
    }

}

const getArticles = async (req, res) => {

    const from = Number(req.query.from || 0);
    const limit = Number(req.query.limit);
    const category = String(req.params.category);
    const days = req.params.date;

    const dateNow = moment()
    const dateFrom = moment().subtract(days,'d');

    try {

        if(category === 'all'){

            if(days === 'all'){
                const [ articles, total ] = await Promise.all([
                    Article.find()
                        .sort({date: -1})
                        .skip(from)
                        .limit(limit),
                    Article.countDocuments()
                ]);
                return res.json({
                    ok: true,
                    articles,
                    total
                })

            }else{
                const [ articles, total ] = await Promise.all([
                    Article.find({"date": {"$gte": Date.parse(dateFrom), "$lt": Date.parse(dateNow)}})
                        .sort({date: -1})
                        .skip(from)
                        .limit(limit),
                    Article.countDocuments({"date": {"$gte": Date.parse(dateFrom), "$lt": Date.parse(dateNow)}})
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
                    Article.find({category: category})
                        .sort({date: -1})
                        .skip(from)
                        .limit(limit),
                    Article.countDocuments({category: category})
                ]);
                return res.json({
                    ok: true,
                    articles,
                    total
                })

            }else{
                
                const [ articles, total ] = await Promise.all([
                    Article.find({$and: [{ "date": {"$gte": Date.parse(dateFrom), "$lt": Date.parse(dateNow)} }, { category: category }]})
                        .sort({date: -1})
                        .skip(from)
                        .limit(limit),
                    Article.countDocuments({$and: [{ "date": {"$gte": Date.parse(dateFrom), "$lt": Date.parse(dateNow)} }, { category: category }]})
                ]);
                return res.json({
                    ok: true,
                    articles,
                    total
                })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Cannot get articles'
        })
    }

    

}

const getArticle = async (req, res) => {

    const articleId = req.params.id;

    try {

        const article = await Article.findById(articleId);

        res.status(200).json({
            ok: true,
            article
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Cannot get article'
        })
    }

}

const updateArticle = async (req, res) => {

    const articleId = req.params.id;
    const uid = req.uid;

    try {

        const update = {
            updatedBy: uid,
            updated: new Date()
        }

        articleUpdated = {...req.body, update }

        await Article.findByIdAndUpdate(articleId, articleUpdated, {new: true});

        res.status(200).json({
            ok: true,
            msg: 'Article updated'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Cannot update article'
        })
    }
}

const getRelated = async (req, res) => {

    const title = req.params.title;
    const category = req.params.category;

    try {

        const dbArticles = await Article.find({category: category}).sort({date: -1}).skip(Math.random()*(Article.countDocuments({category: category}))).limit(4);
        let filtered = dbArticles.filter(article => article.title !== title);
        let articles = filtered.slice(0, 3);

        res.status(200).json({
            ok: true,
            articles
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Cannot get related'
        })
    }


}

module.exports = { getArticles, getArticle, newArticle, updateArticle, getRelated };