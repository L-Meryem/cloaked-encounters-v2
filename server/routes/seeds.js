

const express = require("express");
const router = express.Router();
const seedController = require("../controllers/seeds");

//Seed routes/////////
router.get("/", seedController.getSeeds);

router.get("/:id", seedController.getSeed);

router.post("/", seedController.addSeed);

router.delete("/:id", seedController.deleteSeed);


module.exports = router;