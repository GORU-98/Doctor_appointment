const jwt=require("jsonwebtoken");
const authkey="Hey its my health website.";
const fetchDoctor=async(req,res,next)=>{

    const token= await req.header("docToken");
    // console.log("token not found")
    if(!token){
        throw new Error;
    }
    const docToken = jwt.verify(token,authkey);
    req.client=docToken.client;

    next();



}

module.exports=fetchDoctor;