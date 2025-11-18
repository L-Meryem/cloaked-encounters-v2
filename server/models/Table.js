const mongoose = require('mongoose');
const { Schema } = mongoose

const TableSchema = new Schema({
    name: String,
    die: String, //1d100
    entries: [
        {
            id: mongoose.ObjectId,
            roll: Number,
            entry: String // could be 4 or between 4 and 6
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});

module.exports= mongoose.model("Table", TableSchema);