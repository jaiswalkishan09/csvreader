const fs = require('fs');
const download = require('download');
const csv = require('csv-parser')

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


module.exports={removeFile}