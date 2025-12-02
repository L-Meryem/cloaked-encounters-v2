const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const cors = require('cors');

require("dotenv").config({ path: "./config/.env" });
const PORT = process.env.PORT;

const mongoose = require("mongoose");
const connectMongo = require("./config/db");
connectMongo();
const StoreInDB = require("connect-mongo"); //not compatible with mongodb 7!

//Middleware///////
app.use(express.json());
app.use(cors({
    origin: [
        'https://l-meryem.github.io',
        'http://localhost:8000'
    ],
    credentials: true
}));

app.use(
    session({
        secret: process.env.SESSION_SECRET, //Encrypt cookie
        resave: false, //no resave to db if nothing changes
        saveUninitialized: false, //no sessions for visitors
        store: StoreInDB.create({
            mongoUrl: process.env.DB_STRING
        }),
        cookie: {
            secure: true,
            sameSite: 'none',
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 // 24h
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

//Routes///////////
const tableRoutes = require("./routes/tables");
const chainRoutes = require("./routes/chains");
const seedRoutes = require("./routes/seeds");
const authRoutes = require("./routes/auth");

app.use("/auth", authRoutes);
app.use("/tables", tableRoutes);
app.use("/chains", chainRoutes);
app.use("/seeds", seedRoutes);

//Server//////////
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});