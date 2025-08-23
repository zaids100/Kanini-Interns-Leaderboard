// const Intern = require('../models/intern.model');
const IntegratedIntern = require('../models/integrated_intern.model')

const getAllInternsData = async (req, res) => {
    try {
        // Get batch from query params (optional)
        const batch = req.query.batch ? Number(req.query.batch) : null;

        // Build filter
        const filter = batch ? { batch } : {};

        // Fetch interns with optional batch filter, exclude password and __v
        const data = await IntegratedIntern.find(filter, { password: 0, __v: 0 });

        res.status(200).json({ interns: data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// module.exports = { getAllInternsData };


const getInternById = async (req, res) => {
    try {
        const { ka_id } = req.params;
        const intern = await IntegratedIntern.findOne({ ka_id }, { password: 0, __v: 0 });
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
        const updatedIntern = await IntegratedIntern.findOneAndUpdate(
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
};

const addCertificationToIntern = async (req, res) => {
    try {
        const { ka_id } = req.params;
        const { certification_name, certificate_link } = req.body;

        // Verify the user is updating their own profile
        if (req.user.ka_id !== ka_id) {
            return res.status(403).json({ error: 'You can only update your own profile' });
        }

        if (!certification_name || !certificate_link) {
            return res.status(400).json({ error: 'Both certification name and link are required' });
        }

        const intern = await IntegratedIntern.findOne({ ka_id });
        if (!intern) {
            return res.status(404).json({ error: 'Intern not found' });
        }

        // Check if certification already exists
        if (intern.certifications && intern.certifications.some(cert => cert.certification_name === certification_name)) {
            return res.status(400).json({ error: 'Certification with this name already exists' });
        }

        // Add new certification
        if (!intern.certifications) {
            intern.certifications = [];
        }
        intern.certifications.push({ certification_name, certificate_link });
        await intern.save();

        res.status(200).json({
            message: 'Certification added successfully',
            certifications: intern.certifications
        });
    } catch (error) {
        console.error('Error adding certification:', error);
        res.status(500).json({ error: 'Failed to add certification' });
    }
};

const updateCertificationForIntern = async (req, res) => {
    try {
        const { ka_id, certification_name } = req.params;
        const { certification_name: newName, certificate_link } = req.body;

        // Verify the user is updating their own profile
        if (req.user.ka_id !== ka_id) {
            return res.status(403).json({ error: 'You can only update your own profile' });
        }

        if (!newName || !certificate_link) {
            return res.status(400).json({ error: 'Both certification name and link are required' });
        }

        const intern = await IntegratedIntern.findOne({ ka_id });
        if (!intern) {
            return res.status(404).json({ error: 'Intern not found' });
        }

        // Find and update the certification
        const certIndex = intern.certifications.findIndex(cert => cert.certification_name === certification_name);
        if (certIndex === -1) {
            return res.status(404).json({ error: 'Certification not found' });
        }

        // Check if new name conflicts with existing certifications
        if (newName !== certification_name && intern.certifications.some(cert => cert.certification_name === newName)) {
            return res.status(400).json({ error: 'Certification with this name already exists' });
        }

        intern.certifications[certIndex] = { certification_name: newName, certificate_link };
        await intern.save();

        res.status(200).json({
            message: 'Certification updated successfully',
            certifications: intern.certifications
        });
    } catch (error) {
        console.error('Error updating certification:', error);
        res.status(500).json({ error: 'Failed to update certification' });
    }
};

const deleteCertificationForIntern = async (req, res) => {
    try {
        const { ka_id, certification_name } = req.params;

        // Verify the user is updating their own profile
        if (req.user.ka_id !== ka_id) {
            return res.status(403).json({ error: 'You can only update your own profile' });
        }

        const intern = await IntegratedIntern.findOne({ ka_id });
        if (!intern) {
            return res.status(404).json({ error: 'Intern not found' });
        }

        // Remove the certification
        if (intern.certifications) {
            intern.certifications = intern.certifications.filter(cert => cert.certification_name !== certification_name);
            await intern.save();
        }

        res.status(200).json({
            message: 'Certification deleted successfully',
            certifications: intern.certifications || []
        });
    } catch (error) {
        console.error('Error deleting certification:', error);
        res.status(500).json({ error: 'Failed to delete certification' });
    }
};

module.exports = {
    getAllInternsData,
    getInternById,
    uploadProfilePic,
    addCertificationToIntern,
    updateCertificationForIntern,
    deleteCertificationForIntern
};
