const fs = require('fs');
let {tables}=require('./tableAlias')

async function removeFile(filePath)
{
    try{
        return(
            fs.rm(filePath, { recursive:true },(err) => {
                if(err){
                    // File deletion failed
                    console.error(err.message);
                    return false;
                }
                console.log("File deleted successfully");
            })
        );
    }
    catch(e)
    {  
        console.log("Error while deleting the file",e);
        return false;
    }
}

async function readLogicForSemiColonSepratedValue(results)
{
    try{
        let keys=Object.keys(results[0])[0];
        let keysValue=keys;
        keys=keys.split(';');
        if(results.length>0 && keys.length>1)
        {   
            let ans=[];
            for(let i=0;i<results.length;i++)
            {
                let value=results[i][keysValue];
                let values=value.split(';');
                let allKeys=Object.keys(results[i]);
                let keyValue={};
                let j=0;
                while(j<values.length && j<keys.length)
                {  
                    keyValue[keys[j]]=values[j];
                    j++;
                }
                for(let k=1;k<allKeys.length;k++)
                {
                    let allKeyValue=results[i][allKeys[k]].split(';');

                    if(allKeyValue.length>1)
                    {   j--;
                        if(j<keys.length)
                        {
                            keyValue[keys[j]]=keyValue[keys[j]]+','+allKeyValue[0];
                            j++;
                        }
                        for(let l=1;l<allKeyValue.length;l++)
                        {
                            if(j<keys.length)
                            {
                                keyValue[keys[j]]=allKeyValue[l];
                            }
                            j++;
                        }
                    }
                    else{
                        if(j<=keys.length)
                        {
                            j--;
                            keyValue[keys[j]]=keyValue[keys[j]]+','+allKeyValue[0];
                            j++;
                        }
                    }
                }
                ans.push(keyValue);
            }
            results=ans;
        }
        return results;    
    }
    catch(e){
        console.log("Error in readLogicForSemiColonSepratedValue main catch block.",e);
        return false;
    }
}

async function insertIntoTable(databaseConnection,data,tableName)
{
    try{
        return(
            databaseConnection(tableName)
            .insert(data)
            .then(data=>{
               return data;
            })
            .catch(e=>{
                console.log(e);
                return false;
            })
        )
    }
    catch(e)
    {
        console.log("Error in insertIntoTable main catch block.",e);
        return false;
    }

}

async function getBooksDetails(databaseConnection,isbn,authorEmail)
{
    try{
        console.log("Inside getbook details")
        let subQuery= databaseConnection(tables.books)
        .select({Title:'title',ISBN:'isbn',Authors:'authors',description:'description'});
        if(isbn)
        {
            subQuery=subQuery.where('isbn',isbn);
        }
        if(authorEmail)
        {
            authorEmail="%"+authorEmail+"%";
            subQuery=subQuery.where('authors','like',authorEmail)
            console
        }
        return(
            await subQuery
            .then(data=>{
                return data;
            })
            .catch(e=>{
                console.log("Error in getbookdetails",e);
                return false;
            })
        )
    }
    catch(e)
    {
        console.log("Error in getBooksDetails main catch block",e);
        return false;
    }
}

async function getMagazineDetails(databaseConnection,isbn,authorEmail)
{
    try{
        console.log("Inside getMagazineDetails details")
        let subQuery= databaseConnection(tables.magazines)
        .select({Title:'title',ISBN:'isbn',Authors:'authors',PublishedAt:'publishedAt'});
        if(isbn)
        {
            subQuery=subQuery.where('isbn',isbn);
        }
        if(authorEmail)
        {
            authorEmail="%"+authorEmail+"%";
            subQuery=subQuery.where('authors','like',authorEmail)
        }
        return(
            subQuery
            .then(data=>{
                return data;
            })
            .catch(e=>{
                console.log("Error in getMagazineDetails",e);
                return false;
            })
        )
    }
    catch(e)
    {
        console.log("Error in getMagazineDetails main catch block",e);
        return false;
    }
}

async function getAuthorDetails(databaseConnection,isbn,authorEmail)
{
    try{
        console.log("Inside getAuthorDetails details")
        return(
            databaseConnection(tables.author)
            .select("*")
            .then(data=>{
                return data;
            })
            .catch(e=>{
                console.log("Error in getAuthorDetails",e);
                return false;
            })
        )
    }
    catch(e)
    {
        console.log("Error in getAuthorDetails main catch block",e);
        return false;
    }
}



module.exports={removeFile,readLogicForSemiColonSepratedValue,insertIntoTable,getBooksDetails,getMagazineDetails,getAuthorDetails}