require('dotenv').config();
const mongoose = require('mongoose');

async function connectDb() {
    try {
        await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
        console.log('Connected to DB');
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDb;