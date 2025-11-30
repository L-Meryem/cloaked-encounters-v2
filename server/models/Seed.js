const mongoose = require('mongoose');
const { Schema } = mongoose

const SeedSchema = new Schema({
    name: String,
    content: [ //What was generated from the chain
        {
            tableName: String,
            entry: String,
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    chain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chain"
    }
});

module.exports = mongoose.model("Seed", SeedSchema);