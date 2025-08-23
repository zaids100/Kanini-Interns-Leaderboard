const router=require('express').Router();
const adminAuth = require('../middlewares/auth.admin.middleware');
const { 
    login,
    addModuleAndScoreByInternIdAndModuleId,
    updateScoreByInternIdAndModuleId,
    addCertificationToIntern,
    updateCertificationForIntern,
    updateLeetcodeStatsForIntern,
    updateCommunicationScore
} = require('../controllers/admin.controller');

router.post('/auth/login',login);
router.post('/interns/:ka_id/modules', adminAuth, addModuleAndScoreByInternIdAndModuleId);
router.post('/interns/:ka_id/modules/:moduleNumber',adminAuth,updateScoreByInternIdAndModuleId);

// Certification routes
router.post('/interns/:ka_id/certifications', adminAuth, addCertificationToIntern);
router.put('/interns/:ka_id/certifications/:certification_name', adminAuth, updateCertificationForIntern);

// Leetcode stats routes
router.put('/interns/:ka_id/leetcode-stats', adminAuth, updateLeetcodeStatsForIntern);

//comms routes
router.put("/interns/:ka_id/communication", adminAuth, updateCommunicationScore);
module.exports = router;