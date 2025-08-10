const express = require('express');
const app = express();
const cors = require('cors');

const connectDb = require('./config/db');

const authRoutes = require('./routes/auth.route');
const leaderboardRoutes = require('./routes/intern.route');
const adminRoutes = require('./routes/admin.route');

// const authenticateJWT = require('./middlewares/auth.middleware');

const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Hello From Server!' });
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
