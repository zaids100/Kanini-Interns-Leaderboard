const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');
// const Intern=require('../models/intern.model');
const IntegratedIntern=require('../models/integrated_intern.model');
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

const login = async (req, res) => {
    const { admin_id, password } = req.body;

    // Validate input
    if (!admin_id || !password) {
        return res.status(400).json({ msg: 'admin_id and password are required' });
    }

    try {
        // Find admin
        const admin = await Admin.findOne({ admin_id });
        if (!admin) {
            return res.status(404).json({ msg: 'Admin not found' });
        }

        // Check password (plain text for now; ideally hash with bcrypt)
        if (admin.password !== password) {
            return res.status(401).json({ msg: 'Invalid password' });
        }

        // Create JWT token
        const token = jwt.sign(
            { admin_id: admin.admin_id, role: admin.role || 'admin' }, // role included for RBAC
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Return success
        res.status(200).json({
            msg: 'Login successful',
            token,
            data: {
                admin_id: admin.admin_id,
                name: admin.name,
                role: admin.role
            }
        });

    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};


const addModuleAndScoreByInternIdAndModuleId = async (req, res) => {
    try {
        const { moduleNumber, moduleName, score } = req.body;
        const { ka_id } = req.params;

        const intern = await IntegratedIntern.findOne({ ka_id });
        if (!intern) {
            return res.status(404).json({ msg: 'Intern not found' });
        }

        // Check if module already exists
        const existingModule = intern.score.find(
            m => String(m.moduleNumber) === String(moduleNumber)
        );
        if (existingModule) {
            return res.status(400).json({ msg: 'Module already exists. Use update endpoint.' });
        }

        intern.score.push({ moduleNumber: String(moduleNumber), moduleName, score });
        await intern.save();

        res.json({ msg: 'Module added successfully', intern });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// Update score
const updateScoreByInternIdAndModuleId = async (req, res) => {
    try {
        const { score } = req.body;
        const { ka_id, moduleNumber } = req.params;

        const intern = await IntegratedIntern.findOne({ ka_id });
        if (!intern) {
            return res.status(404).json({ msg: 'Intern not found' });
        }

        const module = intern.score.find(
            m => String(m.moduleNumber) === String(moduleNumber)
        );
        if (!module) {
            return res.status(404).json({ msg: 'Module not found' });
        }

        module.score = score;
        await intern.save();

        res.json({ msg: 'Score updated successfully', intern });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// Add certification to intern
const addCertificationToIntern = async (req, res) => {
    try {
        const { certification_name, certificate_link } = req.body;
        const { ka_id } = req.params;

        if (!certification_name || !certificate_link) {
            return res.status(400).json({ msg: 'certification_name and certificate_link are required' });
        }

        const intern = await IntegratedIntern.findOne({ ka_id });
        if (!intern) {
            return res.status(404).json({ msg: 'Intern not found' });
        }

        // Check if certification already exists
        const existingCert = intern.certifications.find(
            cert => cert.certification_name === certification_name
        );
        if (existingCert) {
            return res.status(400).json({ msg: 'Certification already exists. Use update endpoint.' });
        }

        intern.certifications.push({ certification_name, certificate_link });
        await intern.save();

        res.json({ msg: 'Certification added successfully', intern });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// Update certification for intern
const updateCertificationForIntern = async (req, res) => {
    try {
        const { certificate_link } = req.body;
        const { ka_id, certification_name } = req.params;

        if (!certificate_link) {
            return res.status(400).json({ msg: 'certificate_link is required' });
        }

        const intern = await IntegratedIntern.findOne({ ka_id });
        if (!intern) {
            return res.status(404).json({ msg: 'Intern not found' });
        }

        const certification = intern.certifications.find(
            cert => cert.certification_name === certification_name
        );
        if (!certification) {
            return res.status(404).json({ msg: 'Certification not found' });
        }

        certification.certificate_link = certificate_link;
        await intern.save();

        res.json({ msg: 'Certification updated successfully', intern });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// Update leetcode stats for intern
const updateLeetcodeStatsForIntern = async (req, res) => {
    try {
        const { easy, medium, hard } = req.body;
        const { ka_id } = req.params;

        if (easy === undefined && medium === undefined && hard === undefined) {
            return res.status(400).json({ msg: 'At least one leetcode stat field is required' });
        }

        const intern = await IntegratedIntern.findOne({ ka_id });
        if (!intern) {
            return res.status(404).json({ msg: 'Intern not found' });
        }

        // Update only provided fields
        if (easy !== undefined) intern.leetcode_stats.easy = easy;
        if (medium !== undefined) intern.leetcode_stats.medium = medium;
        if (hard !== undefined) intern.leetcode_stats.hard = hard;

        await intern.save();

        res.json({ msg: 'Leetcode stats updated successfully', intern });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

const updateCommunicationScore = async (req, res) => {
    const { ka_id } = req.params;
    const { grammar, proactiveness, fluency } = req.body;

    // Validate input: all should be numbers and within expected ranges
    if (
        grammar === undefined ||
        proactiveness === undefined ||
        fluency === undefined ||
        isNaN(grammar) ||
        isNaN(proactiveness) ||
        isNaN(fluency)
    ) {
        return res.status(400).json({
            msg: "All communication fields (grammar, proactiveness, fluency) are required and must be numbers."
        });
    }

    // Optionally, add range checks (e.g., grammar/proactiveness: 0-20, fluency: 0-10)
    if (
        grammar < 0 || grammar > 20 ||
        proactiveness < 0 || proactiveness > 20 ||
        fluency < 0 || fluency > 10
    ) {
        return res.status(400).json({
            msg: "Grammar and proactiveness must be 0-20, fluency must be 0-10."
        });
    }

    try {
        const intern = await IntegratedIntern.findOne({ ka_id });
        if (!intern) {
            return res.status(404).json({ msg: "Intern not found" });
        }

        // Update or add communication scores
        intern.communication = {
            grammar: Number(grammar),
            proactiveness: Number(proactiveness),
            fluency: Number(fluency)
        };

        await intern.save();
        return res.status(200).json({
            msg: "Communication scores updated successfully",
            intern,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
};

module.exports = { 
    login,
    addModuleAndScoreByInternIdAndModuleId,
    updateScoreByInternIdAndModuleId,
    addCertificationToIntern,
    updateCertificationForIntern,
    updateLeetcodeStatsForIntern,
    updateCommunicationScore
};
