const mongoose=require("mongoose");

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        
    },
    lname:{
        type:String,
        
    },
    email:{
        type:String,
        
    },
    password:{
        type:String,
    },
    cpassword:{
        type:String,
    }
}   
)

const UserModel= new mongoose.model("UserModel",UserSchema);

module.exports =UserModel