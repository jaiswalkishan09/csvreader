const express= require("express");
const { readCsv,findBooksByItsISBN,getDataOfBooksAndMagazingInSortedOrder,getBookMagazineAuthor } = require("../controllers/csvController");
const csvRouter= express.Router();

csvRouter.post("/readcsv",readCsv);

csvRouter.post("/findmatchingrecord",findBooksByItsISBN);

csvRouter.post("/bookmagazinesortbytitle",getDataOfBooksAndMagazingInSortedOrder);

csvRouter.post("/getbookmagazineauthor",getBookMagazineAuthor);

module.exports = csvRouter;