
const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { login, renewToken } = require('../controllers/auth.controller');
const { validateData } = require('../middlewares/validateData');
const { validateJWT } = require('../middlewares/validateJWT')


// path: '/api/login'

router.get('/renewToken', validateJWT, renewToken);

router.post(
    '/',
    [
        check('email', 'Email not valid').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validateData
    ],
    login
);


module.exports = router;