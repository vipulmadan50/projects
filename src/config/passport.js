const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );

    // Google Strategy
    passport.use(
        new GoogleStrategy(
            {
                clientID: keys.googleClientID,
                clientSecret: keys.googleClientSecret,
                callbackURL: '/api/auth/google/callback'
            },
            (token, tokenSecret, profile, done) => {
                User.findOne({ googleId: profile.id })
                    .then(user => {
                        if (user) {
                            return done(null, user);
                        } else {
                            const newUser = new User({
                                googleId: profile.id,
                                googleToken: token,
                                name: profile.displayName,
                                email: profile.emails[0].value,
                                avatar: profile.photos[0].value
                            });
                            newUser.save().then(user => done(null, user));
                        }
                    })
                    .catch(err => console.log(err));
            }
        )
    );

    // Facebook Strategy
    passport.use(
        new FacebookStrategy(
            {
                clientID: keys.facebookClientID,
                clientSecret: keys.facebookClientSecret,
                callbackURL: '/api/auth/facebook/callback',
                profileFields: ['id', 'displayName', 'photos', 'email']
            },
            (token, tokenSecret, profile, done) => {
                User.findOne({ facebookId: profile.id })
                    .then(user => {
                        if (user) {
                            return done(null, user);
                        } else {
                            const newUser = new User({
                                facebookId: profile.id,
                                facebookToken: token,
                                name: profile.displayName,
                                email: profile.emails[0].value,
                                avatar: profile.photos[0].value
                            });
                            newUser.save().then(user => done(null, user));
                        }
                    })
                    .catch(err => console.log(err));
            }
        )
    );

    // Twitter Strategy
    passport.use(
        new TwitterStrategy(
            {
                consumerKey: keys.twitterConsumerKey,
                consumerSecret: keys.twitterConsumerSecret,
                callbackURL: '/api/auth/twitter/callback',
                includeEmail: true
            },
            (token, tokenSecret, profile, done) => {
                User.findOne({ twitterId: profile.id })
                    .then(user => {
                        if (user) {
                            return done(null, user);
                        } else {
                            const newUser = new User({
                                twitterId: profile.id,
                                twitterToken: token,
                                name: profile.displayName,
                                email: profile.emails[0].value,
                                avatar: profile.photos[0].value
                            });
                            newUser.save().then(user => done(null, user));
                        }
                    })
                    .catch(err => console.log(err));
            }
        )
    );

    // GitHub Strategy
    passport.use(
        new GitHubStrategy(
            {
                clientID: keys.githubClientID,
                clientSecret: keys.githubClientSecret,
                callbackURL: '/api/auth/github/callback',
                scope: ['user:email']
            },
            (token, tokenSecret, profile, done) => {
                User.findOne({ githubId: profile.id })
                    .then(user => {
                        if (user) {
                            return done(null, user);
                        } else {
                            const newUser = new User({
                                githubId: profile.id,
                                githubToken: token,
                                name: profile.displayName,
                                email: profile.emails[0].value,
                                avatar: profile.photos[0].value
                            });
                            newUser.save().then(user => done(null, user));
                        }
                    })
                    .catch(err => console.log(err));
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
};
