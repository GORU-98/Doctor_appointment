const mongoose=require("mongoose");

const contactSchema=new mongoose.Schema({

    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel"
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    number:{
        type:Number
    },
    subject:{
        type:String
    },
    msg:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const contactModel=new mongoose.model("contactModel",contactSchema)

module.exports=contactModel;

