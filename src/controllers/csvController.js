let csvToJson = require('convert-csv-to-json');
const download = require('download');
// const csv = require('csv-parser')
// require knex for database connection
var knex = require('knex'); 
const {removeFile,readLogicForSemiColonSepratedValue,insertIntoTable,getBooksDetails,getMagazineDetails,getAuthorDetails}=require("../common/commonFunctions");
const { tables } = require('../common/tableAlias');
const dbConnection=require("../common/connection");

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
                results = csvToJson.getJsonFromCsv(fileName);
                console.log(results)
                let connectDb= await dbConnection.getDataBaseConnection();
                databaseConnection  =knex(connectDb.connection);
                removeFile(fileName);
                if(results)
                {   
                    console.log(results)
                    let insertResult= await insertIntoTable(databaseConnection,results,tableName);
                    if(!insertResult)
                    {   databaseConnection?databaseConnection.destroy():null;
                        return res.status(500).json({message:"Error occured while inserting the parse data into table."});
                    }
                    databaseConnection?databaseConnection.destroy():null;
                    return res.status(200).json({result:results});
                }
                else{
                    throw("Error while parsing the csv file"); 
                }
            }
        }
    }
    catch(e)
    {
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
        else if(category=='magazine')
        {
            details=await getMagazineDetails(databaseConnection);
        }
        else if(category=='author')
        {
            details= await getAuthorDetails(databaseConnection);
        }
        else{
            databaseConnection?databaseConnection.destroy():null;
            return res.status(400).json({message:"Please provide a category."});
        }
        if(details)
        {
            databaseConnection?databaseConnection.destroy():null;
            return res.status(200).json({details:details});
        }
        else{
            throw("Error while processing the record to ge getbookmagazineauthor details.")
        }
        
    }
    catch(e)
    {
        databaseConnection?databaseConnection.destroy():null;
        console.log("Error in getBookMagazineAuthor main catch block",e);
        return res.status(500).json({message:"Something went wrong please try again"});   
    }
}

const findBookMagazineByItsISBNAuthor=async (req,res)=>{
    let databaseConnection;
    try{
        let category=req.body.category;
        let isbn=req.body.isbn;
        let authorEmail=req.body.author;
        if(!isbn && !authorEmail || (isbn && authorEmail))
        {
            return res.status(400).json({message:"please provide isbn or authorEmail to filter."});
        }
        let details=[];
        let connectDb= await dbConnection.getDataBaseConnection();
        databaseConnection  =knex(connectDb.connection);
        if(category=='books')
        {
            details=await getBooksDetails(databaseConnection,isbn,authorEmail);
        }
        else if(category=='magazine')
        {
            details=await getMagazineDetails(databaseConnection,isbn,authorEmail);
        }
        else{
            databaseConnection?databaseConnection.destroy():null;
            return res.status(400).json({message:"Please provide a category."});
        }

        if(details && authorEmail)
        {   let filterDetails=[];
            for(let i=0;i<details.length;i++)
            {
                let getAuthorDetails=details[i]['Authors'].split(',');
                for(let j=0;j<getAuthorDetails.length;j++)
                {
                    if(getAuthorDetails[j]==authorEmail)
                    {
                        filterDetails.push(details[i]);
                    }
                }
            }
            details=filterDetails;
        }

        if(details)
        {
            databaseConnection?databaseConnection.destroy():null;
            return res.status(200).json({details:details});
        }
        else{
            throw("Error while processing the record to ge findBookMagazineByItsISBNAuthor details.")
        }
    }
    catch(e)
    {
        databaseConnection?databaseConnection.destroy():null;
        console.log("Error in findBookMagazineByItsISBNAuthor main catch block",e);
        return res.status(500).json({message:"Something went wrong please try again"});   
    }
}

const getDataOfBooksAndMagazingInSortedOrder=async (req,res)=>{
    let databaseConnection;
    try{
        let connectDb= await dbConnection.getDataBaseConnection();
        databaseConnection  =knex(connectDb.connection);
        let [bookDetails,magazineDetails] = await Promise.all([getBooksDetails(databaseConnection),getMagazineDetails(databaseConnection)]);
        if(bookDetails && magazineDetails)
        {
            let details=bookDetails.concat(magazineDetails);
            details=details.sort((a, b) => {
                if (a.Title < b.Title) {
                  return -1;
                }
              });
            return res.status(200).json({details:details});
        }
        else{
            throw("Error while getting bookDetails and magazine Details");
        }
    }
    catch(e)
    {
        databaseConnection?databaseConnection.destroy():null;
        console.log("Error in getDataOfBooksAndMagazingInSortedOrder main catch block",e);
        return res.status(500).json({message:"Something went wrong please try again"});  
    }
}
module.exports={readCsv,getBookMagazineAuthor,findBookMagazineByItsISBNAuthor,getDataOfBooksAndMagazingInSortedOrder};