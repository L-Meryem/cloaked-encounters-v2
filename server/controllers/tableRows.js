const Table = require("../models/Table");

const addRow = async (req, res) => {
    try {
        const table = await Table.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    entries: {
                        roll: req.body.roll,
                        entry: req.body.entry
                    }
                }
            },
            { new: true }
        );
        res.status(201).json({ success: true, data: table });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const updateRow = async (req, res) => {
    try {
        //findIdAndUpdate cant be used to query inside an array
        const table = await Table.findOneAndUpdate(
            {
                _id: req.params.id,
                "entries._id": req.params.rowId
            },
            {
                $set: {
                    // $ positional update operator (mongodb)
                    // represent the entry i found
                    "entries.$.roll": req.body.roll,
                    "entries.$.entry": req.body.entry
                }
            },
            { new: true }
        );
        res.status(200).json({ success: true, data: table });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const deleteRow = async (req, res) => {
    try {
        const table = await Table.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    entries: { _id: req.params.rowId }
                }
            },
            { new: true }
        );
        res.status(200).json({ success: true, data: table });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = { addRow, updateRow, deleteRow };