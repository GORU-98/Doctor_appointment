const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true }, 
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, required: true },
  service: { type: String, required: true },
  helpful: { type: Boolean, default: true },
  responseTime: { type: String, required: true },
  staffRating: { type: Number, required: true, min: 1, max: 5 },
  facilityRating: { type: Number, required: true, min: 1, max: 5 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true }, 
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;