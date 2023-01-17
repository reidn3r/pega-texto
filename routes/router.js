const express = require('express');
const router = express.Router();

router.get('/', require('../controllers/renderViews').getHome);

router.get('/:id', require('../controllers/renderViews').getId);

router.use('/:id/zip', require('../controllers/middleware/downloadMiddleware'));

router.get('/:id/zip', (req, res, next) => {
    const { id } = req.params;
    //res.redirect(`/${id}`);
    res.download(req.FILE_DIR);
    //fs.rm(req.zipDIR, {force: true});
    //next();
})

router.post('/', require('../controllers/renderViews').postHome);

router.get('*', (req, res) => {
    res.redirect('/');
})

module.exports = router;