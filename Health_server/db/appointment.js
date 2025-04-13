const mongoose=require("mongoose");

const appointmentSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel",
        required:true
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true
    },
    doctor: String,
    problem:String,
    appointmentDate: String,
    time: String,
    status: String,
    date:{
        type:Date,
        default:Date.now
    }
  });
  
  const AppointmentModel = mongoose.model('Appointment', appointmentSchema);


module.exports=AppointmentModel;

