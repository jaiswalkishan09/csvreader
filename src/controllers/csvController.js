const fs = require('fs');
const download = require('download');
const csv = require('csv-parser')
// require knex for database connection
var knex = require('knex'); 
const {removeFile,readLogicForSemiColonSepratedValue,insertIntoTable,getBooksDetails}=require("../common/commonFunctions");
const { tables } = require('../common/tableAlias');
const dbConnection=require("../common/connection")
const readCsv=async (req,res)=>{
    let fileName="";
    let  databaseConnection;
    try{
        let url=req.body.url;
        let category=req.body.category;
        let tableName=""
        if(category==="author")
        {
            tableName=tables.author;
        }
        else if(category==="magazine")
        {
            tableName=tables.magazines;
        }
        else if(category==="books")
        {
            tableName=tables.books;
        }
        else{
            return res.status(400).json({message:"please provide category among author,magazine,books."});
        }
        if(url)
        {
            let splitUrl=url.split('/');
            fileName=splitUrl[splitUrl.length-1];
            let extension=fileName.split('.');
            if(extension.length==2 && extension[1]=="csv")
            {   
                fileName=__dirname +'/../tempCsvFiles/'+fileName;
                await download(url,__dirname +'/../tempCsvFiles');
                let results=[];
                fs.createReadStream(fileName)
                .pipe(csv())
                .on("data", function (row) {
                    results.push(row);
                })
                .on("end", async function () {
                    results= await readLogicForSemiColonSepratedValue(results);
                    let connectDb= await dbConnection.getDataBaseConnection();
                    databaseConnection  =knex(connectDb.connection);
                    removeFile(fileName);
                    console.log(results);
                    if(results)
                    {
                        let insertResult= await insertIntoTable(databaseConnection,results,tableName);
                        console.log(insertResult)
                        if(!insertResult)
                        {   databaseConnection?databaseConnection.destroy():null;
                            return res.status(500).json({message:"Error occured while inserting the parse data into table."});
                        }
                        databaseConnection?databaseConnection.destroy():null;
                        return res.status(200).json({result:results});
                    }
                    else{
                        throw("Error while doing  json logic"); 
                    }
                    
                })
                .on("error", function (error) {
                    removeFile(fileName);
                    console.log("Error in getListOfJsonFromCsv main catch block",error);
                    throw("Error while getting json from csv");
                })
            }
            else{
                databaseConnection?databaseConnection.destroy():null;
                removeFile(fileName);
                return res.status(400).json({message:"Please provide valid csv file."});
            }
        }
        else{
            databaseConnection?databaseConnection.destroy():null;
            removeFile(fileName);
            return res.status(400).json({message:"Please provide a valid url."});
        }

    }
    catch(e)
    {   
        databaseConnection?databaseConnection.destroy():null;
        removeFile(fileName);
        console.log("Error in readcsv functon",e);
        return res.status(500).json({message:"Something went wrong please try again"});
    }
}

const getBookMagazineAuthor=async (req,res)=>{
    let databaseConnection;
    try{
        let category=req.body.category;
        let details=[];
        let connectDb= await dbConnection.getDataBaseConnection();
        databaseConnection  =knex(connectDb.connection);
        if(category=='books')
        {
            details=await getBooksDetails(databaseConnection);
        }
        if(category=='magazine')
        {
            
        }
        return res.status(200).json({details:details});
    }
    catch(e)
    {

    }
}



const findBooksByItsISBN=async (req,res)=>{
    let fileName="";
    try{
        let url=req.body.url;
        let isbn=req.body.isbn;
        let authorEmail=req.body.authorEmail;
        if(!isbn && !authorEmail)
        {
            return res.status(400).json({message:"Please provide valid isbn or author email."});
        }
        if(url)
        {
            let splitUrl=url.split('/');
            fileName=splitUrl[splitUrl.length-1];
            let extension=fileName.split('.');
            if(extension.length==2 && extension[1]=="csv")
            {   
                fileName=__dirname +'/../tempCsvFiles/'+fileName;
                await download(url,__dirname +'/../tempCsvFiles');
                let results=[];
                fs.createReadStream(fileName)
                .pipe(csv())
                .on("data", function (row) {
                    results.push(row);
                })
                .on("end", async function () {
                    results= await readLogicForSemiColonSepratedValue(results);
                    removeFile(fileName);
                    let matchingRecord=[];
                    for(let i=0;i<results.length;i++)
                    {   
                        if(results[i]['isbn']===isbn)
                        {
                            matchingRecord.push(results[i]);
                        }
                        else if(authorEmail)
                        {
                            let authors=results[i]['authors'].split(',');
                            for(let j=0;j<authors.length;j++)
                            {
                                if(authors[j]===authorEmail)
                                {
                                    matchingRecord.push(results[i]);
                                }
                            }
                        }
                    }
                    console.log(matchingRecord);
                    return res.status(200).json({matchingRecord:matchingRecord});
                })
                .on("error", function (error) {
                    removeFile(fileName);
                    console.log("Error in findBooksByItsISBN main catch block",error);
                    throw("Error while getting json from csv");
                })
            }
            else{
                removeFile(fileName);
                return res.status(400).json({message:"Please provide valid csv file."});
            }
        }
        else{
            removeFile(fileName);
            return res.status(400).json({message:"Please provide a valid url or isb number."});
        }

    }
    catch(e)
    {   removeFile(fileName);
        console.log("Error in findBooksByItsISBN functon",e);
        return res.status(500).json({message:"Something went wrong please try again"});
    }
}

const getDataOfBooksAndMagazingInSortedOrder=async (req,res)=>{
    try{
        let magazineUrl=req.body.magazineUrl;
        let authorUrl=req.body.authorUrl;
        if(magazineUrl )
        {
            console.log(magazineUrl)
            req.body.url=magazineUrl;
            let x=await readCsv(req,res);
            console.log(x)
        }
        // return readCsv(req,res);
    }
    catch(e)
    {

    }
}

module.exports={readCsv,findBooksByItsISBN,getDataOfBooksAndMagazingInSortedOrder,getBookMagazineAuthor};