
const { Router } = require('express');

const { getArticles, getArticle, newArticle, updateArticle, getRelated } = require('../controllers/articles.controller');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();


// route: /api/articles

router.post('/new-article', validateJWT, newArticle );

router.get('/get-articles/:category/:date', getArticles );
router.get('/get-article/:id', getArticle );
router.get('/get-related/:title/:category', getRelated)
    
router.put('/update-article/:id', validateJWT, updateArticle );


module.exports = router;