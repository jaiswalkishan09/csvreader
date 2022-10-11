const express= require("express");
const { readCsv } = require("../controllers/csvController");
const csvRouter= express.Router();

csvRouter.post("/readcsv",readCsv);

module.exports = csvRouter;