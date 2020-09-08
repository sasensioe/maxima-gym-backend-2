
const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { teamLogin, membersLogin, renewUserToken, renewClientToken } = require('../controllers/auth.controller');
const { validateData } = require('../middlewares/validateData');
const { validateJWT } = require('../middlewares/validateJWT')


// path: '/api/login'

router.get('/renewUserToken/', validateJWT, renewUserToken);
router.get('/renewClientToken/', validateJWT, renewClientToken);

router.post(
    '/team',
    [
        check('email', 'Email not valid').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validateData
    ],
    teamLogin
);

router.post(
    '/members',
    [
        check('email', 'Email not valid').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validateData
    ],
    membersLogin
);


module.exports = router;