const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { getUserProfile, updateUserProfile, uploadPhoto, listPublicProfiles } = require('../controllers/userController');

// @route   GET api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', auth, getUserProfile);

// @route   PUT api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, updateUserProfile);

// @route   PUT api/users/photo
// @desc    Upload user photo
// @access  Private
router.put('/photo', auth, uploadPhoto);

// @route   GET api/users/public
// @desc    List public profiles
// @access  Public
router.get('/public', listPublicProfiles);

module.exports = router;
