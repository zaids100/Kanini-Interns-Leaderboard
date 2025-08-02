require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ msg: 'Invalid or expired token' });
            }
            console.log(user);
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ msg: 'Authorization header missing' });
    }
};

module.exports = authenticateJWT;