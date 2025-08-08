const router=require('express').Router();
const adminAuth = require('../middlewares/auth.admin.middleware');
const { login,addModuleAndScoreByInternIdAndModuleId,updateScoreByInternIdAndModuleId } = require('../controllers/admin.controller');

router.post('/auth/login',login);
router.post('/interns/:ka_id/modules', adminAuth, addModuleAndScoreByInternIdAndModuleId);
router.post('/interns/:ka_id/modules/:moduleNumber',adminAuth,updateScoreByInternIdAndModuleId);

module.exports = router;