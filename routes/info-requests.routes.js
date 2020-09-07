
const { Router } = require('express');

const router = Router();

const { newInfoRequest, getInfoRequest, getInfoRequests, setResponse, addCallLog } = require('../controllers/info-requests.controller')

// path: '/api/info-requests'

router.get('/', getInfoRequests );
router.get('/get-request/:id', getInfoRequest );

router.post('/', newInfoRequest );

router.put('/set-response/:id', setResponse )
router.put('/register-call/:id', addCallLog );


module.exports = router;