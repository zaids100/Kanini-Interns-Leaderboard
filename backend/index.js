const express = require('express');
const app = express();
const cors = require('cors');

const connectDb = require('./config/db');

const authRoutes = require('./routes/auth.route');
const leaderboardRoutes = require('./routes/intern.route');
const adminRoutes = require('./routes/admin.route');

// const authenticateJWT = require('./middlewares/auth.middleware');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Hello World!' });
});



app.use('/auth', authRoutes);
app.use('/leaderboard', leaderboardRoutes);
app.use('/admin', adminRoutes);



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
