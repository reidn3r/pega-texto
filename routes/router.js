const express = require('express');
const app = express();
const router = express.Router();

router.get('/', require('../controllers/renderViews').getHome);

app.use('/:id', (req, res, next) => {
    console.log(`middleware log`);
    next()
})
router.get('/:id', require('../controllers/renderViews').getId);

router.post('/', require('../controllers/renderViews').postHome);

module.exports = router;