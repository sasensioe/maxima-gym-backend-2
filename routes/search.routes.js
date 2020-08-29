
const { Router } = require('express');

const { getByCollection } = require('../controllers/search.controller')


const router = Router();


// route: /api/all

router.get('/collection/:table/:text/:param', getByCollection)


module.exports = router