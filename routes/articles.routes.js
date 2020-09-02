
const { Router } = require('express');

const { getArticles, getArticle, newArticle, updateArticle } = require('../controllers/articles.controller');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();


// route: /api/articles

router.post('/newArticle', validateJWT, newArticle );

router.get('/getArticles/:category', getArticles );
router.get('/getArticle/:id', getArticle );
    
router.put('/updateArticle/:id', validateJWT, updateArticle );


module.exports = router;