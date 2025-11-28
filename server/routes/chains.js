const express = require("express");
const router = express.Router();
const chainController = require("../controllers/chains");

//Chain routes/////////
router.get("/", chainController.getChains);

router.get("/:id", chainController.getChain);

router.post("/", chainController.addChain);

router.put("/:id", chainController.updateChain);

router.delete("/:id", chainController.deleteChain);

router.delete("/delete-table/:id", chainController.deleteTableFromChain);


module.exports = router;