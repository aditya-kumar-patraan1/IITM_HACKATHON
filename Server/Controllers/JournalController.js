const JournalSchema = require("../Models/JournalSchema");

const addJournal = async (req,res) =>{
    const {moodTitle,moodDescription}=req.body;
    const userId=req.body.userId;
    
    // console.log(moodTitle,moodDescription,userId);
    
    if(!moodTitle || !moodDescription || !userId || userId==undefined){
        return res.json({
            status:0,
            message:"Please fill all the fields"
        });
    }

    try{
        const newEntry=new JournalSchema({
            moodTitle,
            moodDescription,
            author:userId
        })
        await newEntry.save();
        return res.json({
            status:1,
            message:"Journal added successfully"
        })
    }catch(e){
        return res.json({
            status:0,
            message:"Error in adding journal"
        })
    }
    
}

const getJournals = async (req, res) => {
    const userId = req.body.userId;

    // console.log("Fetching journals for user:", userId);

    if(!userId){
        return res.json({
            status:0,
            message:"User ID is required"
        });
    }

    try{
        // const allJournals = [];
        const myDatas = [];
        const allJournals = await JournalSchema.find();
        for(let i=0;i<allJournals.length;i++){
            if(allJournals[i].author==userId){
                myDatas.push(allJournals[i]);
            }
        }
        // console.log("Journals fetched:", myDatas);
        if(myDatas.length>0){
            return res.json({
                status:1,   
                journals: myDatas
            })
        }
        return res.json({
            status:0,
            journals: null
        })
    }catch(e){
        return res.json({
            status:0,
            message:"Error in fetching journals"
        })
    }

}

module.exports={addJournal,getJournals};


//read bhi karna hai !