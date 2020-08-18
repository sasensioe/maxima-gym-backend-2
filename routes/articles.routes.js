
const { Router } = require('express');

const { getArticles, newArticle, updateArticle } = require('../controllers/articles.controller');

const { check } = require('express-validator');
const { validateData } = require('../middlewares/validateData');

const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();


// route: /api/articles

router.get('/', getArticles);

router.post(
    '/',
    [
        validateJWT,
        check('title', 'Title is required').not().isEmpty(),
        check('img', 'Image is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('category', 'Category is required').not().isEmpty(),
        check('body', 'Body is required').not().isEmpty(),
        validateData
    ],
    newArticle);
    
router.put('/:id', validateJWT, updateArticle);

module.exports = router;