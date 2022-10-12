const express= require("express");
const { readCsv,findBooksByItsISBN } = require("../controllers/csvController");
const csvRouter= express.Router();

csvRouter.post("/readcsv",readCsv);

csvRouter.post("/findmatchingrecord",findBooksByItsISBN);

module.exports = csvRouter;