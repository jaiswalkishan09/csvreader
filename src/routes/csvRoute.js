const express= require("express");
const { readCsv,getBookMagazineAuthor,findBookMagazineByItsISBNAuthor ,getDataOfBooksAndMagazingInSortedOrder} = require("../controllers/csvController");
const csvRouter= express.Router();

csvRouter.post("/readcsv",readCsv);

csvRouter.post("/findmatchingrecord",findBookMagazineByItsISBNAuthor);

csvRouter.post("/getbookmagazineauthor",getBookMagazineAuthor);

csvRouter.post("/bookmagazinesortbytitle",getDataOfBooksAndMagazingInSortedOrder);

module.exports = csvRouter;