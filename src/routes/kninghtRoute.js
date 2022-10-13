const express= require("express");

const knightRouter= express.Router();

const {knighController}=require("../controllers/knighController");

knightRouter.post("/findknightroutes",knighController);

module.exports = knightRouter;