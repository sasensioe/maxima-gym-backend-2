
const { Router } = require('express');

const { newAdmin, getUsers, newUser, updateUser, getUserById, checkPassword, updatePassword } = require('../controllers/users.controller');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();


// route: /api/users

router.post('/', newAdmin );
router.post('/newUser', validateJWT, newUser );

router.get('/getUsers/:role', validateJWT, getUsers );
router.get('/getUser/:id', validateJWT, getUserById );

router.put('/updateUser/:id', validateJWT, updateUser );

router.get('/checkPassword/:id', validateJWT, checkPassword );
router.put('/updatePassword/:id', validateJWT, updatePassword );


module.exports = router;