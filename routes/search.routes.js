
const { Router } = require('express');

const { getByCollection } = require('../controllers/search.controller')

const { check } = require('express-validator');
const { validateData } = require('../middlewares/validateData');

const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();


// route: /api/all


router.get('/collection/:table/:text', validateJWT, getByCollection)



module.exports = router