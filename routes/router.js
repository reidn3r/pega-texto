const express = require('express');
const router = express.Router();

router.get('/', require('../controllers/renderViews').getHome);

router.get('/:id', require('../controllers/renderViews').getId);

router.post('/', require('../controllers/renderViews').postHome);

module.exports = router;