const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String
});

//Password hash in a middleware hook//////
UserSchema.pre('save', async function (next) {
    try {
        const user = this;
        if (!user.isModified("password"))
            return next(); //skip hashing

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (error) {
        console.log("Password can't be hashed", error);
        next(error);
    }
})
////////////////////

module.exports = mongoose.model("User", UserSchema);