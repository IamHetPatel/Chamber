const mongoose =require('mongoose');

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true
    },
    walletAddress:{
        type:String,
        required:true
    }
})

const issues = new mongoose.Schema({
    project:{
        type:String,
        required:true
    },
    issuesId:{
        type:String,
        required:true
    },
    walletAddress:{
        type:String,
        required:true
    }
    })

module.exports= mongoose.model('Company', companySchema)