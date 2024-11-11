import React from 'react';

import blog1 from '../../assets/images/blog1.jpeg';
import blog2 from '../../assets/images/blog2.jpeg';  
import blog3 from '../../assets/images/blog3.jpeg';  

function Blogs() {
  return (
    <div className="p-8 w-full">
      <h1 className="text-4xl font-bold text-center mb-6">Our Blogs</h1>
      <p className="text-lg mb-6 text-center">
        Stay informed and inspired with our latest blogs on education, technology, and effective student management.
        Explore our articles to discover tips, strategies, and trends that can transform the learning experience.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Blog Box 1 */}
        <div className="p-6 bg-customViolet text-white rounded-lg shadow-lg">
          <img
            src={blog1}
            alt="Engagement"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2"> How to Foster Student Engagement in the Digital Age</h2>
          <p className="text-lg">
            With the rise of online learning, keeping students engaged can be challenging. In this article,
            we explore practical and innovative strategies for fostering student engagement in the digital
            classroom, from interactive activities to using technology effectively to keep students active,
            motivated, and deeply involved.
          </p>
        </div>

        {/* Blog Box 2 */}
        <div className="p-6 bg-customViolet text-white rounded-lg shadow-lg">
          <img
            src={blog2}
            alt="Data Security"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2"> Best Practices for Managing Student Data Securely</h2>
          <p className="text-lg">
            As educational institutions adopt digital tools to manage student information, it’s crucial to ensure that student data
            is stored securely. This blog covers best practices for protecting sensitive student data, including encryption, role-based
            access controls, and regular audits to prevent data breaches.
          </p>
        </div>

        {/* Blog Box 3 */}
        <div className="p-6 bg-customViolet text-white rounded-lg shadow-lg">
          <img
            src={blog3}
            alt="AI in Education"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2"> The Role of AI in Shaping the Future of Education</h2>
          <p className="text-lg">
            Artificial Intelligence is revolutionizing education, from personalized learning experiences to automated grading systems.
            In this article, we dive into how AI is transforming the educational landscape and how schools and universities can harness
            this technology to enhance the learning journey for students and teachers alike.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
