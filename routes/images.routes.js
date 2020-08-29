
const { Router } = require('express');
const expressFileUpload = require('express-fileupload')

const { imageUpload, getImage } = require('../controllers/images.controller')
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

router.use(expressFileUpload());

// Route: /api/images

router.get( '/:collection/:image', getImage );

router.put( '/:collection/:id', validateJWT, imageUpload );

module.exports = router;