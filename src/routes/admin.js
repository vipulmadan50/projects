const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middlewares/auth');
const { getAllProfiles } = require('../controllers/adminController');

// @route   GET api/admin/profiles
// @desc    Get all user profiles
// @access  Private (Admin)
router.get('/profiles', adminAuth, getAllProfiles);

module.exports = router;
