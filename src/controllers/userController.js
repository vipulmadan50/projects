const User = require('../models/user');

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateUserProfile = async (req, res) => {
    const { name, bio, phone, email, isPublic } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (name) user.name = name;
        if (bio) user.bio = bio;
        if (phone) user.phone = phone;
        if (email) user.email = email;
        if (typeof isPublic === 'boolean') user.isPublic = isPublic;
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const uploadPhoto = async (req, res) => {
    const { avatar } = req.body; // or use multer to handle file upload
    try {
        const user = await User.findById(req.user.id);
        user.avatar = avatar;
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const listPublicProfiles = async (req, res) => {
    try {
        const users = await User.find({ isPublic: true }).select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getUserProfile, updateUserProfile, uploadPhoto, listPublicProfiles };
