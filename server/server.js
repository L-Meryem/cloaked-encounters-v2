const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const cors = require('cors');
const path = require('path');

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
        'https://cloaked-encounters.onrender.com',
        'https://cloaked-encounters.onrender.com/'
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
        proxy: true,
        cookie: {
            secure: true,
            sameSite: 'none',
            httpOnly: true,
            maxAge: 3600000 * 24, // 24h
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

app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

//Server//////////
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});