const User = require('../models/user');

const getAllProfiles = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getAllProfiles };
