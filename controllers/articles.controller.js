
const Article = require('../models/article.model')

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

    try {
        if(category === 'all'){
            const [ articles, total ] = await Promise.all([
                Article.find()
                    .skip(from)
                    .limit(limit)
                    .sort({date: -1}),
                
                Article.countDocuments()
            ]);
            return res.json({
                ok: true,
                articles,
                total
            })
        }else{
            const [ articles, total ] = await Promise.all([
                Article.find({category: category})
                    .skip(from)
                    .limit(limit)
                    .sort({date: -1}),
                
                Article.countDocuments({category: category})
            ]);
            return res.json({
                ok: true,
                articles,
                total
            })
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


module.exports = { getArticles, getArticle, newArticle, updateArticle };