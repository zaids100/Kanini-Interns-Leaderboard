const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');
const Intern=require('../models/intern.model');
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

        const intern = await Intern.findOne({ ka_id });
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

        const intern = await Intern.findOne({ ka_id });
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

module.exports = { login,addModuleAndScoreByInternIdAndModuleId,updateScoreByInternIdAndModuleId };
