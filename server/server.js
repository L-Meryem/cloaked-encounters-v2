const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");

require("dotenv").config({ path: "./config/.env" });
const PORT = process.env.PORT;

const mongoose = require("mongoose");
const connectMongo = require("./config/db");
connectMongo();
const StoreInDB = require("connect-mongo"); //not compatible with mongodb 7!

//Middleware///////
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET, //Encrypt cookie
        resave: false, //no resave to db if nothing changes
        saveUninitialized: false, //no sessions for visitors
        store: StoreInDB.create({
            mongoUrl: process.env.DB_STRING
        })
    })
);

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

//Routes///////////
const tableRoutes = require("./routes/tables");
const authRoutes = require("./routes/auth");

app.use("/auth", authRoutes);
app.use("/tables", tableRoutes);

//Server//////////
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});