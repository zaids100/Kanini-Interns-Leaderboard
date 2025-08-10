const router = require('express').Router();
const { getAllInternsData, getInternById, uploadProfilePic, addCertificationToIntern, updateCertificationForIntern, deleteCertificationForIntern } = require('../controllers/intern.controller');
const parser = require('../middlewares/upload');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/all', authMiddleware,getAllInternsData);
router.get('/:ka_id', authMiddleware,getInternById);
router.post('/upload-profile-pic', authMiddleware,parser.single('profilePic'), uploadProfilePic);

// Certification management routes (protected by auth)
router.post('/:ka_id/certifications', authMiddleware, addCertificationToIntern);
router.put('/:ka_id/certifications/:certification_name', authMiddleware, updateCertificationForIntern);
router.delete('/:ka_id/certifications/:certification_name', authMiddleware, deleteCertificationForIntern);

module.exports = router;