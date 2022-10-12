const fs = require('fs');
const download = require('download');
const csv = require('csv-parser')
const {removeFile}=require("../common/commonFunctions")

const readCsv=async (req,res)=>{
    let fileName="";
    try{
        let url=req.body.url;
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
                .on("end", function () {
                    let keys=Object.keys(results[0])[0];
                    let keysValue=keys;
                    keys=keys.split(';');
                    if(results.length>0 && keys.length>=1)
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
                        // removeFile(fileName);
                        return res.status(200).json({result:ans});
                    }
                    // removeFile(fileName);
                    return res.status(200).json({result:results});
                })
                .on("error", function (error) {
                    // removeFile(fileName);
                    console.log("Error in getListOfJsonFromCsv main catch block",error);
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
            return res.status(400).json({message:"Please provide a valid url."});
        }

    }
    catch(e)
    {   removeFile(fileName);
        console.log("Error in readcsv functon",e);
        return res.status(500).json({message:"Something went wrong please try again"});
    }
}

module.exports={readCsv};