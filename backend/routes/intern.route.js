const router = require('express').Router();
const { getAllInternsData, getInternById,uploadProfilePic } = require('../controllers/intern.controller');
const parser = require('../middlewares/upload');

router.get('/all', getAllInternsData);
router.get('/:ka_id', getInternById);
router.post('/upload-profile-pic',parser.single('profilePic'),uploadProfilePic);

module.exports = router;