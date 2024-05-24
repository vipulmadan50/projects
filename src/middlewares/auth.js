const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/user');

const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, keys.secretOrKey);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};

const adminAuth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, keys.secretOrKey);
        req.user = decoded;
        const user = await User.findById(decoded.id);
        if (!user.isAdmin) return res.status(403).json({ message: 'Access denied' });
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};

module.exports = { auth, adminAuth };
