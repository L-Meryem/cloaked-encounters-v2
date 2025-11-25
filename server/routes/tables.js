const express = require("express");
const router = express.Router();
const tablesController = require("../controllers/tables");
const tableRowsController = require("../controllers/tableRows");


//Table routes///////
router.get("/", tablesController.getTables);

router.get("/shared", tablesController.getSharedTables);

router.get("/:id", tablesController.getTable);

router.post("/", tablesController.addTable);

router.put("/:id", tablesController.updateTable);

router.delete("/:id", tablesController.deleteTable);

//Table's entries////////
router.post("/:id/rows", tableRowsController.addRow);

router.put("/:id/rows/:rowId", tableRowsController.updateRow);

router.delete("/:id/rows/:rowId", tableRowsController.deleteRow);


module.exports = router;