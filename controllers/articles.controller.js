
const Article = require('../models/article.model')

const getArticles = async (req, res) => {

    const from = Number(req.query.from || 0);
    const limit = Number(req.query.limit);
    const category = req.params.category;

    try {
        if(category === 'all'){
            const [ articles, total ] = await Promise.all([
                Article.find()
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
                Article.find({category: category})
                    .skip(from)
                    .limit(limit),
                
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

    

};

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

const newArticle = async (req, res) => {

    const article = new Article({...req.body, createdBy: req.uid});

    await article.save();

    console.log(article._id)

    console.log(article.img)

    res.json({
        ok: true,
        msg: 'Article published'
    })

}

const updateArticle = async (req, res) => {

    const articleId = req.params.id;
    const uid = req.uid

    console.log(req.body)

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