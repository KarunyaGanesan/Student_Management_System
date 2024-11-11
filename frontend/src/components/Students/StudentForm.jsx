import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bg from '../../assets/images/bg.jpg';
import success from '../../assets/images/check.png';

const StudentForm = ({ studentToEdit, onStudentAddedOrUpdated, onClose }) => {
  const [student, setStudent] = useState({
    registerNumber: '',
    firstName: '',
    lastName: '',
    dob: { day: '', month: '', year: '' },
    studentClass: '',
    section: '',
    fathersName: '',
    mothersName: '',
    address: '',
    bloodGroup: '',
    phoneNumber: '',
    gender: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (studentToEdit) {
      if (typeof studentToEdit.dob === 'string') {
        const dobParts = studentToEdit.dob.split('-');
        setStudent({
          ...studentToEdit,
          dob: {
            day: dobParts[0] || '',
            month: dobParts[1] || '',
            year: dobParts[2] || '',
          },
        });
      } else {
        setStudent({
          ...studentToEdit,
          dob: {
            day: studentToEdit.dob.day || '',
            month: studentToEdit.dob.month || '',
            year: studentToEdit.dob.year || '',
          },
        });
      }
      setErrors({});
    } else {
      clearForm();
      setErrors({});
    }
  }, [studentToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const nameRegex = /^[a-zA-Z\s]*$/;
    const addressRegex = /^[a-zA-Z0-9\s,.'-]*$/;

    if (name.startsWith('dob.')) {
      const dobField = name.split('.')[1];
      setStudent((prev) => ({
        ...prev,
        dob: {
          ...prev.dob,
          [dobField]: value, // Do not trim here
        },
      }));
    } else if (name === 'fathersName' || name === 'mothersName') {
      if (nameRegex.test(value)) {
        setStudent((prev) => ({
          ...prev,
          [name]: value, // Do not trim here
        }));
      }
    } else if (name === 'address') {
      if (addressRegex.test(value)) {
        setStudent((prev) => ({
          ...prev,
          [name]: value, // Do not trim here to allow spaces
        }));
      }
    } else {
      setStudent((prev) => ({
        ...prev,
        [name]: value.trim(),
      }));
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Clear error message for the updated field
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!studentToEdit && !student.registerNumber) {
      newErrors.registerNumber = 'Register number is required.';
    }

    if (!student.firstName) newErrors.firstName = 'First name is required.';
    if (!student.lastName) newErrors.lastName = 'Last name is required.';

    if (!student.dob.day || !student.dob.month || !student.dob.year) {
      newErrors.dob = 'Complete date of birth is required.';
    }

    if (!student.studentClass) newErrors.studentClass = 'Class is required.';
    if (!student.section) newErrors.section = 'Section is required.';
    if (!student.fathersName) newErrors.fathersName = "Father's name is required.";
    if (!student.mothersName) newErrors.mothersName = "Mother's name is required.";
    if (!student.address) newErrors.address = 'Address is required.';
    if (!student.bloodGroup) newErrors.bloodGroup = 'Blood group is required.';
    if (!student.phoneNumber) newErrors.phoneNumber = 'Phone number is required.';
    if (!/^\d{10}$/.test(student.phoneNumber)) newErrors.phoneNumber = 'Phone number must be 10 digits.';
    if (!student.gender) newErrors.gender = 'Gender selection is required.';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const studentData = {
      ...student,
      dob: {
        day: student.dob.day,
        month: student.dob.month,
        year: student.dob.year,
      },
    };

    try {
      if (!studentToEdit) {
        const response = await axios.get(`http://localhost:5000/api/students/registerNumber/${student.registerNumber}`);
        if (response.data.exists) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            registerNumber: 'Register number already exists',
          }));
          return;
        }
      }

      if (studentToEdit) {
        await axios.put(`http://localhost:5000/api/students/${studentToEdit._id}`, studentData);
      } else {
        await axios.post('http://localhost:5000/api/students', studentData);
      }

      setIsSubmitted(true);
      clearForm();

      if (typeof onStudentAddedOrUpdated === 'function') {
        onStudentAddedOrUpdated();
      }

      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error('Error adding/updating student:', error);
    }
  };

  const clearForm = () => {
    setStudent({
      registerNumber: '',
      firstName: '',
      lastName: '',
      dob: { day: '', month: '', year: '' },
      studentClass: '',
      section: '',
      fathersName: '',
      mothersName: '',
      address: '',
      bloodGroup: '',
      phoneNumber: '',
      gender: '',
    });
    setErrors({});
  };



  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <form onSubmit={handleSubmit} className="p-5 border rounded-lg max-w-xl mx-auto bg-transparent backdrop-blur-lg shadow-lg" autoComplete='off'>
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Student Details</h2>

        {isSubmitted && (
          <div className="text-center mb-6">
            <img src={success} alt="Success" className="mx-auto h-16 w-16" />
            <p className="text-green-600 font-semibold">Student added successfully!</p>
          </div>
        )}


        {/* Register Number and Gender */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <input
              type="text"
              name="registerNumber"
              value={student.registerNumber}
              onChange={handleChange}
              placeholder="Register Number"
              disabled={studentToEdit?true : false}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.registerNumber && <p className="text-xs text-red-500 font-semibold ml-3">{errors.registerNumber.toLowerCase()}</p>}
          </div>
          <div>
            <select
              name="gender"
              value={student.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-xs text-red-500 font-semibold ml-3">{errors.gender.toLowerCase()}</p>}
          </div>
        </div>

        {/* First Name and Last Name */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <input
              type="text"
              name="firstName"
              value={student.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              inputMode="none"
            />
            {errors.firstName && <p className="text-xs text-red-500 font-semibold ml-3">{errors.firstName.toLowerCase()}</p>}
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              value={student.lastName || ''}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              inputMode="none"
            />
            {errors.lastName && <p className="text-xs text-red-500 font-semibold ml-3">{errors.lastName.toLowerCase}</p>}
          </div>
        </div>

        {/* Date of Birth */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <select
              name="dob.day"
              value={student.dob.day || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>Day</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <option key={day} value={String(day).padStart(2, '0')}>{String(day).padStart(2, '0')}</option>
              ))}
            </select>
            {errors.dob?.day && <small className="text-xs text-red-500 font-semibold ml-3">{errors.dob.day.toLowerCase()}</small>}
          </div>
          <div>
            <select
              name="dob.month"
              value={student.dob.month || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>Month</option>
              {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            {errors.dob?.month && <small className="text-xs text-red-500 font-semibold ml-3">{errors.dob.month.toLowerCase()}</small>}
          </div>
          <div>
            <select
              name="dob.year"
              value={student.dob.year || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>Year</option>
              {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {errors.dob?.year && <small className="text-xs text-red-500 font-semibold ml-3">{errors.dob.year.toLowerCase()}</small>}
          </div>
        </div>


        {/* Class and Section */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <select
              name="studentClass"
              value={student.studentClass}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>Class</option>
              {['LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'].map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              name="section"
              value={student.section}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>Section</option>
              {Array.from({ length: 11 }, (_, i) => (
                <option key={i} value={String.fromCharCode(65 + i)}>
                  {String.fromCharCode(65 + i)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Father's and Mother's Name */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <input
              type="text"
              name="fathersName"
              value={student.fathersName}
              onChange={handleChange}
              placeholder="Father's Name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              type="text"
              name="mothersName"
              value={student.mothersName}
              onChange={handleChange}
              placeholder="Mother's Name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Address */}
        <div className="mb-4">
          <input type='text'
            name="address"
            value={student.address}
            onChange={handleChange}
            placeholder="Address"
            rows="4"
            className="w-full p-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            inputMode="none"
          />
          {errors.address && <p className="text-xs text-red-500 font-semibold ml-3">{errors.address.toLowerCase()}</p>} {/* Error message after textarea */}
        </div>

        {/* Blood Group and Phone Number */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <select
              name="bloodGroup"
              value={student.bloodGroup}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>Blood Group</option>
              {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bloodGroup) => (
                <option key={bloodGroup} value={bloodGroup}>{bloodGroup}</option>
              ))}
            </select>
            {errors.bloodGroup && <p className="text-xs text-red-500 font-semibold ml-3">{errors.bloodGroup.toLowerCase()}</p>} {/* Error message after select */}
          </div>
          <div>
            <input
              type="number"
              name="phoneNumber"
              value={student.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.phoneNumber && <p className="text-xs text-red-500 font-semibold ml-3">{errors.phoneNumber.toLowerCase()}</p>} {/* Error message after input */}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            type="submit"
            disabled={!validateForm}
            className="p-3 w-40 bg-customRed text-white rounded-lg hover:bg-customPurple"
          >
            {studentToEdit ? 'Update Student' : 'Add Student'}
          </button>
          <button
            type="button"
            onClick={clearForm}
            className="p-3 w-40 bg-customPink text-white rounded-lg hover:bg-customPurple"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm; 