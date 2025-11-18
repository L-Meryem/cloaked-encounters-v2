const mongoose = require("mongoose");

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.DB_STRING);
        console.log(`Connected to ${mongoose.connection.name} database`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectMongo;