import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import image1 from '../../assets/images/image1.jpg';
import image2 from '../../assets/images/image2.jpg';
import image3 from '../../assets/images/image3.jpg';
import StudentForm from './StudentForm';
import StudentList from './StudentList';
import About from './About';
import Blogs from './Blogs';
import Contact from './Contact';

const images = [image1, image2, image3];

function Profile() {
  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const formSectionRef = useRef(null); // New ref for scrolling to form
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false); // State to control form visibility
  const [isStudentListVisible, setStudentListVisible] = useState(false); // State to control student list visibility

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleLogout = () => {
    console.log("User logged out");
    navigate('/login');
  };

  const handleStudentAddedOrUpdated = (student) => {
    fetchStudents();
    setFormVisible(false);
    setStudentListVisible(true); // Show student list after form submission
    setStudentToEdit(null);
  };

  const handleEditStudent = (student) => {
    setStudentToEdit(student);
    setFormVisible(true);
    setStudentListVisible(false); // Hide student list while editing
    scrollToForm(); // Scroll to form when editing
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    setStudentToEdit(null);
    setStudentListVisible(true); // Show student list after closing form
  };

  const handleBackToAddStudent = () => {
    setStudentToEdit(null); // Ensure no student data is set
    setFormVisible(true);
    setStudentListVisible(false); // Hide student list while adding a student
    scrollToForm(); // Scroll to form when clicking "Add Student"
  };

  const scrollToForm = () => {
    const navbarHeight = navbarRef.current.offsetHeight;
    window.scrollTo({
      top: formSectionRef.current.offsetTop - navbarHeight,
      behavior: 'smooth',
    });
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const navbarHeight = navbarRef.current.offsetHeight;
    if (sectionElement) {
      window.scrollTo({
        top: sectionElement.offsetTop - navbarHeight,
        behavior: 'smooth',
      });
    }
  };

  const showStudentList = () => {
    setStudentListVisible(true); // Show student list
    setFormVisible(false); // Hide form
    scrollToForm(); // Scroll to student list section
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 relative">
      {/* Sticky Navbar */}
      <nav ref={navbarRef} className="bg-customViolet p-3 shadow-md sticky top-0 z-10 sm:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="space-x-6 hidden md:flex">
            <button onClick={() => scrollToSection('aboutSection')} className="text-white hover:text-gray-200">About</button>
            <button onClick={() => scrollToSection('blogsSection')} className="text-white hover:text-gray-200">Blogs</button>
            <button onClick={handleBackToAddStudent} className="text-white hover:text-gray-200">Add Student</button>
            <button onClick={showStudentList} className="text-white hover:text-gray-200">View/Edit Students</button>
            <button onClick={() => scrollToSection('contactSection')} className="text-white hover:text-gray-200">Contact</button>
          </div>
          {/* Open Menu button for all screen sizes */}
          <button
            onClick={() => setShowSidebar(true)}
            className="text-white absolute right-4"
          >
            <FiMenu size={20} /> {/* Menu icon */}
          </button>

        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">
          "The beautiful thing about learning is that no one can take it away from you."
        </h1>
        <p className="text-lg mb-6 text-center text-gray-600 max-w-2xl mx-auto">
          Dive into managing student records with ease. Explore and organize each student’s details seamlessly.
        </p>

        {/* Image Slideshow */}
        <img
          src={images[currentImageIndex]}
          alt="Changing visual"
          style={{
            width: '100%',
            height: '500px',
            objectFit: 'cover',
            transition: 'opacity 1s ease-in-out',
          }}
        />

        {/* Conditionally Render StudentForm or StudentList */}
        <div id="studentFormSection" ref={formSectionRef} className="mt-8 w-full bg-transparent">
          {isFormVisible && !isStudentListVisible && (
            <StudentForm
              studentToEdit={studentToEdit}
              students={students}
              onStudentAddedOrUpdated={handleStudentAddedOrUpdated}
              onClose={handleCloseForm}
            />
          )}

          {isStudentListVisible && !isFormVisible && (
            <StudentList
              students={students}
              onEditStudent={handleEditStudent}
              setStudents={setStudents}
            />
          )}

          <div className="flex justify-end mt-4">
            {isFormVisible ? (
              <button
                onClick={showStudentList}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full flex items-center justify-center font-semibold hover:from-pink-500 hover:to-purple-500 transition"
              >
                View/Edit Student <span className="ml-2 text-xl">&gt;</span>
              </button>
            ) : (
              <button
                onClick={handleBackToAddStudent}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full flex items-center font-semibold hover:from-pink-500 hover:to-purple-500 transition"
              >
                <span className="mr-2 text-xl">&lt;</span> Add Student
              </button>
            )}
          </div>
        </div>

        {/* About Section */}
        <section id="aboutSection" className="mt-8">
          <About />
        </section>

        {/* Blogs Section (Appears in a row for mobile) */}
        {/* Blogs Section */}
        <section id="blogsSection" className="mt-8">
          <Blogs />
        </section>

        {/* Contact Section */}
        <section id="contactSection" className="mt-8">
          <Contact />
        </section>
      </div>

      {/* Sidebar for Mobile */}
      {showSidebar && (
        <div className="fixed top-0 right-0 h-full w-56 bg-white text-gray-800 shadow-lg z-50 flex flex-col transition-transform duration-700 ease-in-out transform translate-x-0">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <button onClick={() => setShowSidebar(false)} className="text-xl">&times;</button>
          </div>
          <ul className="space-y-4 px-6">
            <li><button onClick={() => scrollToSection('aboutSection')}>About</button></li>
            <li><button onClick={() => scrollToSection('blogsSection')}>Blogs</button></li>
            <li><button onClick={handleBackToAddStudent}>Add Student</button></li>
            <li><button onClick={showStudentList}>View/Edit Students</button></li>
            <li><button onClick={() => scrollToSection('contactSection')}>Contact</button></li>
            <li><button onClick={handleLogout} className="text-red-500">Logout</button></li> {/* Logout Button */}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Profile;