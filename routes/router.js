//expressjs requirement
const express = require('express');
const router = express.Router();

router.get('/', require('../controllers/getHome'));

router.get('/:id', require('../controllers/getId'));

router.post('/', require('../controllers/postHome'));

module.exports = router;