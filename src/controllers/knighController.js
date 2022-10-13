
const knighController=async (req,res)=>{
    try{
       
        let row=req.body.rowPos;
        let col=req.body.colPos;
        if(!row || !col ||row>8 || col>8 || row<=0 || col<=0)
        {
            return res.status(400).json({message:"please provide rowPos and colPos between 1-8."});
        }
        let resultPostiton=[];
        if(row-2>=1)
        {
            if(col-1>=1)
            {
                resultPostiton.push({rowPos:row-2,colPos:col-1});
            }
            if(col+1<=8)
            {
                resultPostiton.push({rowPos:row-2,colPos:col+1}); 
            }
        }
        if(row+2<=8)
        {
            if(col-1>=1)
            {
                resultPostiton.push({rowPos:row+2,colPos:col-1});
            }
            if(col+1<=8)
            {
                resultPostiton.push({rowPos:row+2,colPos:col+1}); 
            }
        }
        if(col-2>=1)
        {
            if(row-1>=1)
            {
                resultPostiton.push({rowPos:row-1,colPos:col-2});
            }
            if(row+1<=8)
            {
                resultPostiton.push({rowPos:row+1,colPos:col-2}); 
            }
        }
        if(col+2<=8)
        {
            if(row-1>=1)
            {
                resultPostiton.push({rowPos:row-1,colPos:col+2});
            }
            if(row+1<=8)
            {
                resultPostiton.push({rowPos:row+1,colPos:col+2}); 
            }
        }
        return res.status(200).json({knightMoves:resultPostiton});
    }
    catch(e)
    {
        console.log("Error in knighController functon",e);
        return res.status(500).json({message:"Something went wrong please try again"});
    }
}

module.exports={knighController}