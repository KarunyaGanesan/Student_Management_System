// controllers/studentController.js

const Student = require('../models/Student'); // Adjust the path if needed

const addStudent = async (req, res) => {
    try {
      // Split the date of birth into day, month, and year
      const formattedDob = req.body.dob.split('-');
      
      // Prepare the student data, reformatting the dob field
      const studentData = {
        ...req.body,
        dob: {
          day: formattedDob[0],
          month: formattedDob[1],
          year: formattedDob[2]
        }
      };
  
      // Save the student data to the database (assuming Student is the model)
      const newStudent = new Student(studentData);
      await newStudent.save();
  
      // Respond with success message
      res.status(201).json({ message: 'Student added successfully', student: newStudent });
    } catch (error) {
      res.status(500).json({ message: 'Error adding student', error: error.message });
    }
  };
  

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new student
exports.addStudent = async (req, res) => {
    const student = new Student({
        name: req.body.name,
        age: req.body.age,
        // Add other fields as necessary
    });

    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Edit an existing student
exports.editStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByIdAndUpdate(id, req.body, { new: true });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByIdAndDelete(id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ message: "Student deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
