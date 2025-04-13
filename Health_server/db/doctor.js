const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  doctorName: { type: String, required: true },
  speciality: { type: String, required: true },
  bio: { type: String, required: true },
  qualification: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  languageSpoken: [{ type: String }],
  feeStructure: { type: String, required: true },
  acceptedPaymentMethod: [{ type: String }],
  pastExperience: { type: String },
  awardsAndRecognitions: { type: String },
  publishedResearchAndArticles: { type: String },
  treatmentOffered: [{ type: String }],
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cpassword: { type: String, required: true },
  clinicHospitalAddress: { type: String, required: true },
  operatingHours: { type: String, required: true },
  appointmentAvailability: { type: String, required: true },
  welcomeMessage: { type: String, required: true },
  linkedin: { type: String },
  twitter: { type: String },
}, { timestamps: true });

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
