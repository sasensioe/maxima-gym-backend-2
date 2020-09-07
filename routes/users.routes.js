
const { Router } = require('express');

const { newAdmin, getUsers, newUser, updateUser, getUserById, checkPassword, updatePassword } = require('../controllers/users.controller');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();


// route: /api/users

router.post('/', newAdmin );
router.post('/new-user', validateJWT, newUser );

router.get('/get-users/:role', validateJWT, getUsers );
router.get('/get-user/:id', validateJWT, getUserById );

router.put('/update-user/:id', validateJWT, updateUser );

router.get('/check-password/:id', validateJWT, checkPassword );
router.put('/update-password/:id', validateJWT, updatePassword );


module.exports = router;