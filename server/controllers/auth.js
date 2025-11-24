const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/User");
const validator = require("validator");


const getMe = async (req, res) => {
    if (req.user)
        return res. json({
            success: true,
            user: { 
                userName: req.user.userName,
                email: req.user.email
            }
        })
    return res.status(401).json({success: false, message:"Not logged in"});
};

const postLogin = async (req, res, next) => {
    const errors = [];

    if (!validator.isEmail(req.body.email))
        errors.push({ message: "Please enter a valid email address." })
    if (validator.isEmpty(req.body.password))
        errors.push({ message: "Password cannot be empty." })

    if (errors.length)
        return res.status(400).json({ success: false, errors: errors });

    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).json({ success: false, message: info.message });
        }

        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Login failed." });
            }
            return res.json({
                success: true,
                user: {
                    id: user.id,
                    userName: user.userName,
                    email: user.email
                }
            });
        });
    })(req, res, next);
};

const postSignup = async (req, res, next) => {
    const errors = [];
    if (!validator.isEmail(req.body.email))
        errors.push({
            message: "Please enter a valid email address."
        });
    if (!validator.isLength(req.body.password, { min: 8 }))
        errors.push({
            message: "Password must be at least 8 characters long."
        });
    if (req.body.password !== req.body.confirmPassword)
        errors.push({
            message: "Passwords do not match."
        });

    if (errors.length)
        return res.status(400).json({ success: false, errors: errors });

    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

    try {
        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        });

        const existingUser = await User.findOne(
            {
                $or: [
                    { email: req.body.email },
                    { userName: req.body.userName }
                ]
            }
        );

        if (existingUser) {
            return res.status(409).json({
                message: "Email address or username taken."
            });
        }

        await user.save(); //pre('save')hashes password 

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            res.json({
                success: true,
                user: {
                    id: user.id,
                    userName: user.userName,
                    email: user.email
                }
            });
        })
    } catch (error) {
        next(error);
    }
};

const logout = (req, res) => {
    req.logout((err) => {
        if (err)
            return res.status(500).json({ success: false, message: "Logout failed." });

        req.session.destroy((err) => {
            if (err)
                return res.status(500).json({ success: false, message: "Session not destroy." });
            req.user = null;
            res.json({ success: true, message: "Logged out." });
        });
    })

};

module.exports = { getMe, postLogin, postSignup, logout };