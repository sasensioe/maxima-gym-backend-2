
const { Router } = require('express');

const router = Router();

const { newInfoRequest, getInfoRequest, getInfoRequests, setResponse, addCallLog } = require('../controllers/info-requests.controller')

// path: '/api/info-requests'

router.get('/', getInfoRequests );
router.get('/getRequest/:id', getInfoRequest );

router.post('/', newInfoRequest );

router.put('/setResponse/:id', setResponse )
router.put('/callLog', addCallLog );


module.exports = router;