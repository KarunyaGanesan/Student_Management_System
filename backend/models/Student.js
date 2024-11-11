const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  registerNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { 
    day: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true }
  },
  studentClass: { type: String, required: true },
  section: { type: String, required: true },
  fathersName: { type: String, required: true },
  mothersName: { type: String, required: true },
  address: { type: String, required: true},
  bloodGroup: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  gender: { type: String, required: true }
});

module.exports = mongoose.model('Student', studentSchema);
