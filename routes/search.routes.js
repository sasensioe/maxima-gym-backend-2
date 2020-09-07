
const { Router } = require('express');

const { getByCollection, searchArticles } = require('../controllers/search.controller')


const router = Router();


// route: /api/all

router.get('/collection/:table/:text/:param', getByCollection)
router.get('/search-articles/:text/:category/:days', searchArticles)

module.exports = router