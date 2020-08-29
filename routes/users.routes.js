
const { Router } = require('express');

const { newAdmin, getUsers, newUser, updateUser, getUser } = require('../controllers/users.controller')
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();


// route: /api/users

router.get('/:role', validateJWT, getUsers)
router.get('/getUser/:id', validateJWT, getUser );

router.post('/', newAdmin );
router.post('/newUser', validateJWT, newUser );

router.put('/updateUser/:id', validateJWT, updateUser );


module.exports = router;