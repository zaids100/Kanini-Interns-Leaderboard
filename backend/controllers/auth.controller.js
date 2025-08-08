const Intern = require('../models/intern.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_secret_key'


const login = async (req, res) => {
    const { ka_id, password } = req.body;
    if (!ka_id || !password) {
        return res.status(400).json({ msg: 'ka_id and password are required' });
    }
    try {
        const intern = await Intern.findOne({ ka_id });
        if (!intern) {
            return res.status(404).json({ msg: 'Intern not found' });
        }
        if (intern.password !== password) {
            return res.status(401).json({ msg: 'Invalid password' });
        }
      
        const token = jwt.sign({ ka_id: intern.ka_id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ msg: 'Login successful', token,data : intern });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

module.exports = { login };