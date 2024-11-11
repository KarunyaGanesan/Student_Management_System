import React from 'react';

function About() {
  return (
    <div className="p-8 bg-customViolet text-white w-full">
      <h1 className="text-4xl font-bold text-center mb-6">About Our Student Management System</h1>
      <p className="text-lg mb-4">
        Our Student Management System (SMS) is designed to streamline the management of student data for educational institutions. 
        With a user-friendly interface, it allows administrators and teachers to easily manage and track student information in real-time.
      </p>
      <p className="text-lg mb-4">
        Built using the powerful MERN stack (MongoDB, Express, React, Node.js), this system provides secure user authentication, 
        and CRUD (Create, Read, Update, Delete) functionalities to ensure seamless management of student records.
      </p>
      <p className="text-lg mb-4">
        The platform is fully responsive, ensuring that it works seamlessly on desktops, tablets, and smartphones. 
        Whether you’re on the go or at your desk, the system adapts to your needs.
      </p>
      <p className="text-lg mb-4">
        Key features include adding new students, viewing and editing records, deleting unnecessary data, 
        and securely storing all student information with password-protected access.
      </p>
      <h2 className="text-2xl font-semibold mt-8">Technologies Used:</h2>
      <ul className="list-disc pl-6">
        <li>React.js for a dynamic, interactive frontend</li>
        <li>Node.js and Express.js for a scalable backend</li>
        <li>MongoDB for a robust, NoSQL database solution</li>
        <li>Firebase Authentication for secure login and user management</li>
      </ul>
      <p className="mt-6 text-lg">
        Our mission is to provide educators with a powerful tool to manage student data efficiently, improving both accessibility and organization.
      </p>
    </div>
  );
}

export default About;
