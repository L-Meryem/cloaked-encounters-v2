const Table = require("../models/Table");

const getTables = async (req, res) => {
    try {
        const tables = await Table.find({author: req.user.id });
        res.status(200).json({ success: true, data: tables });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const getTable = async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);
        res.status(200).json({ success: true, data: table });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const addTable = async (req, res) => {
    try {
        const table = await Table.create({
            name: req.body.name,
            die: req.body.die,
            entries: req.body.entries,
            author: req.user.id
        });
        res.status(201).json({ success: true, data: table }); //React needs the table's id
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Only updates name or die
const updateTable = async (req, res) => {
    try {
        const table = await Table.findOneAndUpdate(
            { _id: req.params.id },
            {
                name: req.params.name,
                die: req.body.die
            },
            { new: true } //return updated table
        );
        res.status(200).json({ success: true, data: table });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const deleteTable = async (req, res) => {
    try {
        const table = await Table.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: table });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = { getTables, getTable, addTable, updateTable, deleteTable };