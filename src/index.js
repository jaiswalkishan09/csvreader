const express= require("express");
const app = express();
const dotenv=require("dotenv")
const csvRouter = require("./routes/csvRoute");
const cors= require("cors");
const knightRouter = require("./routes/kninghtRoute");

dotenv.config({path:__dirname+'/.env'});

app.use(express.json());
// app.use(cors());

app.use("/csv", csvRouter);
app.use("/chess", knightRouter);

// const PORT=process.env.PORT || 5000;

app.listen(5000,()=>{
    console.log("server listning on port no:");
})