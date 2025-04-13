const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true },
  treatment: String,
  medicine: String,
  date: { type: Date, default: Date.now },
});

const PrescriptionModel =mongoose.model('Prescription', PrescriptionSchema);
module.exports = PrescriptionModel
