const mongoose=require("mongoose");

const appointmentSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel"
    },
    doctor: String,
    problem:String,
    appointmentDate: String,
    time: String,
    doctorId:Number,
    status: String,
    date:{
        type:Date,
        default:Date.now
    }
  });
  
  const AppointmentModel = mongoose.model('Appointment', appointmentSchema);


module.exports=AppointmentModel;

