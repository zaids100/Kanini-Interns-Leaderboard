const express = require('express');
const app = express();
const cors = require('cors');
const connectDb = require('./config/db');

// const Admin= require('./models/admin.model');

const authRoutes = require('./routes/auth.route');
const leaderboardRoutes = require('./routes/intern.route');
const adminRoutes = require('./routes/admin.route');

//middlewares
const authenticateJWT = require('../backend/middlewares/auth.middleware');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Hello World!' });
});

// app.post('/test-admin-register', async (req, res) => {
//     try {
//         const { admin_id, password } = req.body;

//         if (!admin_id || !password) {
//             return res.status(400).json({ msg: 'Admin ID and password are required' });
//         }

//         // Check if admin already exists
//         const existingAdmin = await Admin.findOne({ admin_id });
//         if (existingAdmin) {
//             return res.status(400).json({ msg: 'Admin ID already exists' });
//         }

//         // Create new admin
//         const newAdmin = new Admin({ admin_id, password }); 
//         await newAdmin.save();

//         res.status(201).json({
//             msg: 'Admin registered successfully',
//             admin: {
//                 admin_id: newAdmin.admin_id
//             }
//         });
//     } catch (err) {
//         res.status(500).json({ msg: 'Server error', error: err.message });
//     }
// });

app.use('/auth', authRoutes);
app.use('/leaderboard',authenticateJWT,leaderboardRoutes);
app.use('/admin',adminRoutes);
async function startServer() {
    try {
        await connectDb(); 
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (err) {
        console.log('Error', err);
    }
}

startServer();

