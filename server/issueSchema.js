const mongoose =require('mongoose');

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
    },
    completed:{
        type:Boolean,
        default:false
    }
    })

module.exports= mongoose.model('Issues', issues)