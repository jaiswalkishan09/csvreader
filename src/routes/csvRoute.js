const express= require("express");
const { readCsv,getBookMagazineAuthor,findBookMagazineByItsISBNAuthor ,getDataOfBooksAndMagazingInSortedOrder,convertJson2Csv} = require("../controllers/csvController");
const csvRouter= express.Router();

csvRouter.post("/readcsv",readCsv);

csvRouter.post("/findmatchingrecord",findBookMagazineByItsISBNAuthor);

csvRouter.post("/getbookmagazineauthor",getBookMagazineAuthor);

csvRouter.post("/bookmagazinesortbytitle",getDataOfBooksAndMagazingInSortedOrder);

csvRouter.get("/convertjson2csv",convertJson2Csv);

module.exports = csvRouter;