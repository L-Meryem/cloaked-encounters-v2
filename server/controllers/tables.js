const Table = require("../models/Table");

const getTables = async (req, res) => {
    try {
        const tables = await Table.find({ author: req.user.id });
        res.status(200).json({ success: true, data: tables });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const getSharedTables = async (req, res) => {
    try {
        const tables = await Table.find({ shared: true });
        res.status(200).json({ success: true, data: tables });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const getTable = async (req, res) => {
    try {
        const table = await Table.findOne({
            _id: req.params.id,
            author: req.user.id
        });

        if (!table) {
            return res.status(404).json({ success: false, error: "Table not found." });
        }

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
        const updatedTable = {
            name: req.body.name,
            die: req.body.die,
        }
        if("shared" in req.body)
            updatedTable.shared = req.body.shared;

        const table = await Table.findOneAndUpdate(
            {
                _id: req.params.id,
                author: req.user.id
            },
            updatedTable,
            { new: true } //return updated table
        );

        if (!table) {
            return res.status(404).json({ success: false, error: "Table not found." });
        }

        res.status(200).json({ success: true, data: table });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const deleteTable = async (req, res) => {
    try {
        const table = await Table.findOneAndDelete({
            _id: req.params.id,
            author: req.user.id
        });

        if (!table) {
            return res.status(404).json({ success: false, error: "Table not found." });
        }

        res.status(200).json({ success: true, data: table });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = { getTables, getSharedTables, getTable, addTable, updateTable, deleteTable };