const mongoose = require('mongoose');
const { Schema } = mongoose

const SeedSchema = new Schema({
    name: String,
    content: String, //What was generated from the chain
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
     chain: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Chain"
    }
});

module.exports = mongoose.model("Seed", SeedSchema);