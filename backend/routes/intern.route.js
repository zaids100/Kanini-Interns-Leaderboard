const router = require('express').Router();
const { getAllInternsData, getInternById } = require('../controllers/intern.controller');

router.get('/all', getAllInternsData);
router.get('/:ka_id', getInternById);

module.exports = router;