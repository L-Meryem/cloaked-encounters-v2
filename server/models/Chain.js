const mongoose = require('mongoose');
const { Schema } = mongoose

const ChainSchema = new Schema({
    name: String,
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    tables:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Table"
        }
    ]
});

module.exports = mongoose.model("Chain", ChainSchema);