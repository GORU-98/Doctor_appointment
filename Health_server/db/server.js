const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/health").then(()=>{
    console.log("Connection Established to Database");
}).catch((e)=>{
    console.log("Connection failed due to error" + e)
})

