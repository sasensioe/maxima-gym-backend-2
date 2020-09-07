
const { Router } = require('express');

const { newClient, getClients, getClientById, updateClient, updatePassword, updateRoutine } = require('../controllers/clients.controller');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();


// route: /api/clients

router.post('/new-client', validateJWT, newClient );

router.get('/get-clients/:plan', validateJWT, getClients );
router.get('/get-client/:id', validateJWT, getClientById );

router.put('/update-client/:id', validateJWT, updateClient );

router.get('/check-password/:id', validateJWT );
router.put('/update-password/:id', validateJWT, updatePassword );

router.put('/update-routine/:id', validateJWT, updateRoutine );


module.exports = router;