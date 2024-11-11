const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const mongoose = require('mongoose');

// Check if register number already exists
router.get('/registerNumber/:registerNumber', async (req, res) => {
  const { registerNumber } = req.params;
  try {
    const student = await Student.findOne({ registerNumber });
    if (student) {
      // If a student with the same register number exists, respond with `exists: true`
      return res.json({ exists: true });
    }
    res.json({ exists: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new student
router.post('/', async (req, res) => {
  console.log('Received data:', req.body);
  const { registerNumber, firstName, lastName, dob, studentClass, section, fathersName, mothersName, address, bloodGroup, phoneNumber, gender } = req.body;
  
  try {
    // Check if register number already exists
    const existingStudent = await Student.findOne({ registerNumber });
    if (existingStudent) {
      return res.status(400).json({ message: 'Register number already exists' });
    }

    // Validate phone number length
    if (phoneNumber.length !== 10) {
      return res.status(400).json({ message: 'Phone number must be 10 digits long' });
    }

    // Create a new student object
    const student = new Student({
      registerNumber,
      firstName,
      lastName,
      dob,
      studentClass,
      section,
      fathersName,
      mothersName,
      address,
      bloodGroup,
      phoneNumber,
      gender,
    });

    // Save student to the database
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a student
router.put('/:id', async (req, res) => {
  const { registerNumber, firstName, lastName, dob, studentClass, section, fathersName, mothersName, address, bloodGroup, phoneNumber, gender } = req.body;
  try {
    // Validate phone number length
    if (phoneNumber.length !== 10) {
      return res.status(400).json({ message: 'Phone number must be 10 digits long' });
    }

    // Update student data
    const student = await Student.findByIdAndUpdate(req.params.id, {
      registerNumber,
      firstName,
      lastName,
      dob,
      studentClass,
      section,
      fathersName,
      mothersName,
      address,
      bloodGroup,
      phoneNumber,
      gender,
    }, { new: true });

    // Respond with updated student data
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a student
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Received ID:', id);  // Log the received ID

  const cleanedId = id.trim();
  console.log('Cleaned ID:', cleanedId);  // Log the cleaned ID

  if (!mongoose.Types.ObjectId.isValid(cleanedId)) {
    return res.status(400).json({ message: 'Invalid student ID' });
  }

  try {
    const student = await Student.findByIdAndDelete(cleanedId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
