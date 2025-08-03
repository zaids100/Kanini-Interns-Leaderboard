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

const uploadProfilePic = async (req, res) => {
    try {
        if (!req.file || !req.file.path) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const imageUrl = req.file.path;
        console.log(imageUrl);
        const updatedIntern = await Intern.findOneAndUpdate(
            { ka_id: req.user.ka_id },
            { profilePic: imageUrl },
            { new: true }
        );

        res.status(200).json({
            message: 'Profile picture uploaded successfully',
            imageUrl: imageUrl,
            intern: updatedIntern,
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Upload failed' });
    }
}

module.exports = {
    getAllInternsData,
    getInternById,
    uploadProfilePic
};
