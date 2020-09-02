
const { Router } = require('express');

const router = Router();

const { newInfoRequest, getInfoRequest, getInfoRequests, updateInfoRequest } = require('../controllers/info-requests.controller')

// path: '/api/info-requests'

router.get('/', getInfoRequests );
router.get('/getById', getInfoRequest );

router.post('/', newInfoRequest );

router.put('/', updateInfoRequest );


module.exports = router;