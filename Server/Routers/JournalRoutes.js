const express=require("express");
const userAuth = require("../MiddleWares/userAuth");
const { addJournal, getJournals } = require("../Controllers/JournalController");
const RouterJournal=express.Router();


RouterJournal.post("/addJournal",userAuth,addJournal);
RouterJournal.get("/getJournals",userAuth,getJournals);

module.exports=RouterJournal;