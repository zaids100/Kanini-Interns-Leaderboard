const Intern = require('../models/intern.model');

const getAllInternsData = async (req, res) => {
    try {
        const data = await Intern.find({}, { password: 0, __v: 0 });
        res.status(200).json({ interns: data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getInternById = async (req, res) => {
    try {
        const { ka_id } = req.params;
        const intern = await Intern.findOne({ ka_id }, { password: 0, __v: 0 });
        if (!intern) {
            return res.status(404).json({ msg: 'Intern not found' });
        }
        res.status(200).json({ intern });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllInternsData,
    getInternById,
};
