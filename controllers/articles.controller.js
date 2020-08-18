
const Article = require('../models/article.model')

const getArticles = async (req, res) => {

    try {
        
        const users = await Article.find();

        res.status(500).json({
            ok: true,
            users
        })

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cannot get articles'
        })

    }



    res.json({
        ok: true
    })

};

const newArticle = async (req, res) => {

    const article = new Article({...req.body, createdBy: req.uid});

    await article.save();

    res.json({
        ok: true,
        article
    })

}

const updateArticle = async (req, res) => {

    const articleId = req.params.id;
    const uid = req.uid

    try {

        const update = {
            updatedBy: uid,
            date: new Date()
        }

        articleUpdated = {...req.body, update }

        const dbArticle = await Article.findByIdAndUpdate(articleId, articleUpdated, {new: true});



        res.json({
            ok: true,
            dbArticle
        })

    } catch (error) {
        console.log(error)
    }



}


module.exports = { getArticles, newArticle, updateArticle };