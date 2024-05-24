const express = require('express');
const passport = require('passport');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', register);

// @route   POST api/auth/login
// @desc    Login user and return JWT token
// @access  Public
router.post('/login', login);

// @route   POST api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', logout);

// @route   GET api/auth/google
// @desc    Authenticate with Google
// @access  Public
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @route   GET api/auth/google/callback
// @desc    Google auth callback
// @access  Public
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
});

// @route   GET api/auth/facebook
// @desc    Authenticate with Facebook
// @access  Public
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// @route   GET api/auth/facebook/callback
// @desc    Facebook auth callback
// @access  Public
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
});

// @route   GET api/auth/twitter
// @desc    Authenticate with Twitter
// @access  Public
router.get('/twitter', passport.authenticate('twitter'));

// @route   GET api/auth/twitter/callback
// @desc    Twitter auth callback
// @access  Public
router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
});

// @route   GET api/auth/github
// @desc    Authenticate with GitHub
// @access  Public
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// @route   GET api/auth/github/callback
// @desc    GitHub auth callback
// @access  Public
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
});

module.exports = router;
