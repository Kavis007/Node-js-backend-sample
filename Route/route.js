const {Router} = require('express');
const router = Router(); 
const { create, getall, remove, update, getbyid, imageupload } = require('../Controller/controller');

router.post('/create', create);
router.get('/getall', getall);
router.post('/update/:id', update);
router.post('/imageupload', imageupload);

module.exports = router; 
