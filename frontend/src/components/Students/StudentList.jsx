import React, { useState } from 'react';
import axios from 'axios';

const StudentList = ({ students, setStudents, onEditStudent }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleEditClick = (student) => {
    onEditStudent(student);
  };

  const handleViewClick = (student) => {
    console.log("Selected Student:", student); // Log student object for troubleshooting
    setSelectedStudent(student);
  };

  const closeModal = () => {
    setSelectedStudent(null);
  };

  const deleteStudent = async (studentId) => {
    console.log("Deleting student with ID:", studentId);
    try {
      await axios.delete(`http://localhost:5000/api/students/${studentId}`);
      setStudents(students.filter((student) => student._id !== studentId));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-3xl mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Student List</h2>
        
        {!students || students.length === 0 ? (
          <p className="text-gray-500 text-center">No students found.</p>
        ) : (
          <ul className="space-y-4">
            {students.map((student) => (
              <li
                key={student._id}
                className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-green-500 p-4 rounded-lg shadow-md text-white"
              >
                <div>
                  <span className="font-semibold">
                    {student.registerNumber} - {student.firstName} {student.lastName}
                  </span>
                </div>
                
                <div className="space-x-3">
                  <button
                    onClick={() => handleViewClick(student)}
                    className="border-2 border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black font-semibold"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEditClick(student)}
                    className="border-2 border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteStudent(student._id)}
                    className="border-2 border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-2xl font-semibold mb-4">Student Details</h3>
            <p><strong>Register Number:</strong> {selectedStudent.registerNumber}</p>
            <p><strong>First Name:</strong> {selectedStudent.firstName}</p>
            <p><strong>Last Name:</strong> {selectedStudent.lastName}</p>
            <p><strong>Phone Number:</strong> {selectedStudent.phoneNumber}</p>
            <p><strong>Gender:</strong> {selectedStudent.gender}</p>
            <p><strong>Class:</strong> {selectedStudent.studentClass}</p>
            <p><strong>Section:</strong> {selectedStudent.section}</p>
            <p><strong>Date of Birth:</strong> {selectedStudent.dob.day}-{selectedStudent.dob.month}-{selectedStudent.dob.year}</p>
            <p><strong>Blood Group:</strong> {selectedStudent.bloodGroup}</p>
            <p><strong>Address:</strong> {selectedStudent.address}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
