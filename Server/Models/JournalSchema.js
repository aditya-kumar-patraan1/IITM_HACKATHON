const mongoose=require('mongoose');

const journalSchema=new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"patients",
        required:true
    },
    moodTitle:{
        type:String,
        required:true
    },
    moodDescription:{
        type:String,
        required:true
    },
    myDate:{
        type:Date,
        default:Date.now
    }

},{timestamps:true});

module.exports=mongoose.model("journals",journalSchema);