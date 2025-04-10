const jwt=require("jsonwebtoken");
const authkey="Hey its my health website.";
const fetchuser=async(req,res,next)=>{

    const token= await req.header("authtoken");
    if(!token){
        throw new Error;
    }
    const authtoken = jwt.verify(token,authkey);
    req.client=authtoken.client;

    next();



}

module.exports=fetchuser;