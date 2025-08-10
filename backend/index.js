const express = require('express');
const app = express();
const cors = require('cors');

const connectDb = require('./config/db');

const authRoutes = require('./routes/auth.route');
const leaderboardRoutes = require('./routes/intern.route');
const adminRoutes = require('./routes/admin.route');

// const authenticateJWT = require('./middlewares/auth.middleware');

const corsOptions = {
  origin: [process.env.ALLOWED_ORIGIN,"http://localhost:5173"],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
    res.status(200).json({ msg: 'Hello From Server!' });
});



app.use('/api/auth', authRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/admin', adminRoutes);



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
