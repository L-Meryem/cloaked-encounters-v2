const Seed = require("../models/Seed");

const getSeeds = async (req, res) => {
    try {
        const seeds = await Seed.find({ author: req.user.id });
        res.status(200).json({ success: true, data: seeds });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const getSeed = async (req, res) => {
    try {
        const seed = await Seed.findOne({
            _id: req.params.id,
            author: req.user.id
        });

        if (!seed) {
            return res.status(404).json({ success: false, error: "Seed not found." });
        }

        res.status(200).json({ success: true, data: seed });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const addSeed = async (req, res) => {
    try {
        const seed = await Seed.create({
            name: req.body.name,
            author: req.user.id,
            tables: req.body.tables
        });
        res.status(201).json({ success: true, data: seed });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const deleteSeed = async (req, res) => {
    try {
        const seed = await Seed.findOneAndDelete({
            _id: req.params.id,
            author: req.user.id
        });

         if (!seed) {
            return res.status(404).json({ success: false, error: "Seed not found." });
        }

        res.status(200).json({ success: true, data: seed });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}


module.exports = { getSeeds , getSeed, addSeed, deleteSeed};