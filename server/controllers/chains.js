const Chain = require("../models/Chain");

const getChains = async (req, res) => {
    try {
        const chains = await Chain.find({ author: req.user.id });
        res.status(200).json({ success: true, data: chains });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const getChain = async (req, res) => {
    try {
        const chain = await Chain.findOne({
            _id: req.params.id,
            author: req.user.id
        });

        if (!chain) {
            return res.status(404).json({ success: false, error: "Chain not found." });
        }

        res.status(200).json({ success: true, data: chain });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const addChain = async (req, res) => {
    try {
        const chain = await Chain.create({
            name: req.body.name,
            author: req.user.id,
            tables: req.body.tables,
            flowData: req.body.flowData
        });
        res.status(201).json({ success: true, data: chain });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const updateChain = async (req, res) => {
    try {
        const chain = await Chain.findOneAndUpdate(
            {
                _id: req.params.id,
                author: req.user.id
            },
            {
                name: req.body.name,
                tables: req.body.tables,
                flowData: req.body.flowData
            },
            { new: true }
        );

        if (!chain) {
            return res.status(404).json({ success: false, error: "Chain not found." });
        }

        res.status(200).json({ success: true, data: chain });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const deleteChain = async (req, res) => {
    try {
        const chain = await Chain.findOneAndDelete({
            _id: req.params.id,
            author: req.user.id
        });

        if (!chain) {
            return res.status(404).json({ success: false, error: "Chain not found." });
        }

        res.status(200).json({ success: true, data: chain });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const deleteTableFromChain = async (req, res) => {
    try {
        await Chain.updateMany(
            { tables: req.params.id },
            {
                $pull:{
                    tables: req.params.id ,
                    'flowData.nodes': { 'data._id': req.params.id  }
                }
            }
        );

        res.status(200).json({ success: true});
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { getChains, getChain, addChain, updateChain, deleteChain, deleteTableFromChain };