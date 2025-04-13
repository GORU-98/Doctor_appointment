const express=require("express");
const { body, validationResult } = require('express-validator');
const app=express();
app.use(express.json());
const cors=require("cors");
app.use(cors());
const authkey="Hey its my health website.";
const jwt=require("jsonwebtoken");

// db files
require("./db/server");
const UserModel=require("./db/User");
const AppointmentModel=require("./db/appointment");
const Review=require("./db/reviews");
const Doctor=require("./db/doctor");
const PrescriptionModel=require("./db/prescription");
const contactModel=require("./db/contact");
const fetchuser=require("./fetchuser/fetch");
const fetchDoctor=require("./fetchuser/fetchDoctor");

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
app.post("/doctorsignup", async (req, res) => {
  try {
    const { email, password, cpassword } = req.body;
    console.log("Incoming Request Body:", req.body);

    if (password !== cpassword) {
      console.log("Password mismatch");
      return res.status(401).json({ msg: "Password fields are not matching", status: 401 });
    }

    let existingUser = await Doctor.findOne({ email });
    if (existingUser) {
      console.log("Doctor already exists with this email:", email);
      return res.status(401).json({ msg: "Doctor already exists, please login instead.", status: 401 });
    }

    let newDoctor = new Doctor(req.body);
    newDoctor = await newDoctor.save();
    console.log("Doctor saved successfully:", newDoctor);

    const data = {
      client: {
        id: newDoctor.id
      }
    };

    const docToken = jwt.sign(data, authkey);
    console.log("Generated auth token:", docToken);

    return res.status(201).json({ msg: "Account Created Successfully", status: 201, authtoken });

  } catch (error) {
    console.log("Signup Error:", error.message);
    return res.status(500).json({ msg: "Internal server error", error: error.message });
  }
});

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

app.post("/doctorlogin",async (req,res)=>{

        try {
            
    let User= await Doctor.findOne({email:req.body.email});
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

    const docToken= await jwt.sign(data,authkey)
    res.status(200).send({msg:"Login Successfully",status:200,docToken});

} catch (error) {
            res.status(500).json("Internal Server Error");
}

})


app.get('/doctors',fetchuser, async (req, res) => {
  try {
    const userid = req.client.id;
    if(!userid){
      res.status(401).json("Unauthorized");

    }
    const doctors = await Doctor.find(); 
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/doctorDetail', fetchDoctor, async (req, res) => {
  try {
    const doctorId = req.client.id;
    // console.log(doctorId)
    if(!doctorId){
      res.status(401).json("Unauthorized");

    }
    const doctor = await Doctor.findById(doctorId);
    console.log(doctor)
    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error fetching doctor details:', error);
    res.status(500).json({ error: 'Server error while fetching doctor details.' });
  }
});


app.get('/doctorappointments', fetchDoctor, async (req, res) => {

  try {
    const doctorId = req.client.id;
    const appointments = await AppointmentModel.find({doctorId:doctorId})
      .populate('userid',"name lname email")
      .sort({ date: -1 });
// console.log(appointments)
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/prescriptions', fetchDoctor, async (req, res) => {
  const doctorId = req.client.id;
  const { userId, treatment, medicine } = req.body;

  if (!userId || !treatment || !medicine) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const prescription = new PrescriptionModel({
      doctorId,
      userId,
      treatment,
      medicine,
    });

    const saved = await prescription.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save prescription' });
  }
});

app.patch('/appointments/:id/status', fetchDoctor, async (req, res) => {
  const doctorId = req.client.id;
  const { status } = req.body;
// console.log(req.body)
// console.log(doctorId)
// console.log(req.params.id)
  if (!['Accepted', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const updated = await AppointmentModel.findOneAndUpdate(
      { _id: req.params.id, doctorId: doctorId },
      { status },
      { new: true }
    ).populate('userid', 'name lname email');
// console.log(updated)
    if (!updated) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // res.json(updated);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Failed to update appointment status' });
  }
});


// accepted appointments for a doctor
app.get('/appointments/accepted', fetchDoctor, async (req, res) => {
  const doctorId = req.client.id;

  try {
    const appointments = await AppointmentModel.find({
      doctorId: doctorId,
      status: 'Accepted',
    }).populate('userid', 'name lname email');

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching accepted appointments:', error);
    res.status(500).json({ message: 'Failed to fetch accepted appointments' });
  }
});

app.get('/appointments/counts', fetchDoctor, async (req, res) => {
  const doctorId = req.client.id;

  try {
    const acceptedCount = await AppointmentModel.countDocuments({
      doctorId,
      status: 'Accepted',
    });

    const pendingCount = await AppointmentModel.countDocuments({
      doctorId,
      status: 'Not accepted yet',
    });

    res.json({ acceptedCount, pendingCount });
  } catch (error) {
    console.error('Error fetching appointment counts:', error);
    res.status(500).json({ message: 'Failed to fetch appointment counts' });
  }
});




app.post("/schedule", fetchuser, async (req, res) => {
  try {
    const userid = req.client.id;
    const { doctor, appointmentDate, time, problem, doctorId, status } = req.body;

    console.log("Request Body:", req.body);
    console.log("User ID:", userid);

    if (!doctor || !appointmentDate || !time || !problem || !doctorId || !status) {
      return res.status(400).json({ msg: "Missing required fields.", status: 400 });
    }

    let appointment = new AppointmentModel({
      userid,
      doctor,
      appointmentDate,
      time,
      problem,
      doctorId,
      status,
    });

    appointment = await appointment.save();

    res.status(202).json({
      msg: "Appointment Submitted...wait for Response from the Doctor",
      status: 202,
    });
  } catch (error) {
    console.error("Error scheduling appointment:", error);
    res.status(500).json({ msg: error.message, status: 500 }); 
  }
});




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

  app.post(
    '/reviews',
    fetchuser,
    [
      body('doctorId', 'Doctor ID must not be empty').notEmpty(),
      body('rating', 'Rating must be a number between 1 and 5').isInt({ min: 1, max: 5 }),
      body('comment', 'Comment must not be empty').notEmpty(),
      body('date', 'Date must be a valid date').isDate(),
      body('service', 'Service must not be empty').notEmpty(),
      body('helpful', 'Helpful must be a boolean').isBoolean(),
      body('responseTime', 'Response Time must not be empty').notEmpty(),
      body('staffRating', 'Staff Rating must be a number between 1 and 5').isInt({ min: 1, max: 5 }),
      body('facilityRating', 'Facility Rating must be a number between 1 and 5').isInt({ min: 1, max: 5 }),
    ],
    async (req, res) => {
     
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), status: 400 });
      }
  
      try {
        const {
          doctorId,
          rating,
          comment,
          date,
          service,
          helpful,
          responseTime,
          staffRating,
          facilityRating,
        } = req.body;
  
        const userId = req.client.id; 
  
       
        const review = new Review({
          doctorId,
          rating,
          comment,
          date,
          service,
          helpful,
          responseTime,
          staffRating,
          facilityRating,
          userId, 
        });
  
      
        const savedReview = await review.save();
  
        res.status(201).json({ msg: 'Review submitted successfully', review: savedReview, status: 201 });
      } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ msg: 'Internal Server Error', error: error.message, status: 500 });
      }
    }
  );


  app.get('/reviews', fetchuser,async (req, res) => {
    try {
      
      const reviews = await Review.find().populate("userId");
      if(!reviews){
       return res.send("No review found");
      }
      const formattedReviews = reviews.map(review => ({
        _id: review._id,
        doctorId: review.doctorId,
        rating: review.rating,
        comment: review.comment,
        date: review.date,
        service: review.service,
        helpful: review.helpful,
        responseTime: review.responseTime,
        staffRating: review.staffRating,
        facilityRating: review.facilityRating,
        user: {
          name: review.userId.name,
          lname: review.userId.lname,
          email: review.userId.email,
        },
        createdAt: review.createdAt,
      }));
  console.log(formattedReviews)
      res.status(200).json(formattedReviews);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to retrieve reviews', error: err.message });
    }
  });
app.listen(port,()=>{
    console.log(`Server Is Running On Port : ${port}`)
})



