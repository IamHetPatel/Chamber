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

module.exports= mongoose.model('Company', companySchema);