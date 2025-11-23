const mongoose = require('mongoose');
const { Schema } = mongoose

const TableSchema = new Schema({
    name: String,
    die: String, //1d100
    entries: [
        {
            id: mongoose.ObjectId,
            roll: Number,
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