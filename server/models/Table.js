const mongoose = require('mongoose');
const { Schema } = mongoose

const TableSchema = new Schema({
    name: String,
    die: String, //1d100
    entries: [
        {
            id: mongoose.ObjectId,
            roll: String, // could be 4 or between 4 and 6
            entry: String 
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    shared: {
        type: Boolean,
        default: false
    }
});

module.exports= mongoose.model("Table", TableSchema);