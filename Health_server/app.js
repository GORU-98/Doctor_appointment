const express=require("express");
const app=express();
app.use(express.json());
const cors=require("cors");
app.use(cors());
const authkey="Hey its my health website.";
const jwt=require("jsonwebtoken");

// db files
require("./db/server");
const UserModel=require("./db/User");
const FeedModal=require("./db/Feedback");
const AppointmentModel=require("./db/appointment");
const contactModel=require("./db/contact");
const packModel=require("./db/pack");
const fetchuser=require("./fetchuser/fetch");

const port=process.env.PORT || 5000;



app.post("/create-user",async(req,res)=>{

    try {
        
        const { name,lname,email,password,cpassword}=req.body;
        if(password!=cpassword){
            res.status(401).json("Password feilds are not Matching");
            return;
        }

        let User=await UserModel.findOne({email:email});
        if(User){
            res.status(401).json("User already exist,Please Go to signup page");
            return;
        }
        User= await new UserModel(req.body);
        User= await User.save();
        const data={
            client:{
                id:User.id
            }
        }
        const authtoken= await jwt.sign(data,authkey)
        res.status(201).send({msg:"Account Created Successfully",status:201,authtoken});


    }
        catch (error) {
        res.status(401).json(error);
        }


})


app.post("/login",async (req,res)=>{

        try {
            
    let User= await UserModel.findOne({email:req.body.email});
    if(!User){
        res.status(401).json("Invalid Credentials");
        return;
    }
    if(req.body.password != User.password){
        res.status(401).json("Invalid Credentials");
        return;
    }

    const data={
        client:{
            id:User.id
        }
    }

    const authtoken= await jwt.sign(data,authkey)
    res.status(200).send({msg:"Login Successfully",status:200,authtoken});

} catch (error) {
            res.status(500).json("Internal Server Error");
}

})



app.post("/admin-login",async(req,res)=>{

    try {
        const { email,password,auth}=req.body;
        let User=await UserModel.findOne({email:email});
        if(!User){
            res.status(401).json("First create an account");
            return;
        }
        if(password != User.password){
            res.status(401).json("Password does not match");
            return;
        }
        if(auth != authkey){
            res.status(401).json("Invalid Authenticate Key");
            return;
        }

        const data={
            client:{
                id:User.id
            }
        }
    
        const keytoken= jwt.sign(data,authkey);
        res.status(200).send({msg:"Login Successfully",status:200,keytoken});

    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
})


app.post("/schedule",fetchuser,async(req,res)=>{
    try {
        const userid=req.client.id;
        const { doctor, appointmentDate, time ,problem ,doctorId,status}=req.body;
        let appointment=await new AppointmentModel({userid,doctor, appointmentDate, time ,problem ,doctorId,status});
        appointment=await appointment.save();
        res.status(202).send({msg:"Appointment Submitted...wait for Response from the Doctor",status:202});

    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
})




app.get("/appointments", fetchuser, async (req, res) => {
    try {
      const userid = req.client.id;
      let appoints = await AppointmentModel.find({ userid: userid });
  
      if (appoints.length === 0) {
        return res.status(200).send({
          msg: "No appointments found.",
          status: 200,
          data: [] 
        });
      }
  
      res.status(202).send({
        data: appoints,
        status: 202,
        msg: "Appointments fetched successfully."
      });
  
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ msg: "Internal Server Error", status:500 });
    }
  });


  app.delete("/appointments/:appointmentId", fetchuser, async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const userId = req.client.id; 
  
      const appointment = await AppointmentModel.findOne({
        _id: appointmentId,
        userid: userId,
      });
  
      if (!appointment) {
        return res.status(404).json({
          msg: "Appointment not found or you are not authorized to cancel it.",
          status: 404,
        });
      }
  
      await AppointmentModel.findByIdAndDelete(appointmentId);
  
      res.status(200).json({
        msg: "Appointment canceled successfully.",
        status: 200,
      });
    } catch (error) {
      console.error("Error canceling appointment:", error);
      res.status(500).json({
        msg: "Internal Server Error",
        status: 500,
      });
    }
  });


app.listen(port,()=>{
    console.log(`Server Is Running On Port : ${port}`)
})



