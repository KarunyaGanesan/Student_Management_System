import React from 'react';

function Contact() {
  return (
    <div className="bg-customViolet text-white py-8 w-full">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg mb-6">
          Have any questions about our Student Management System? We’re here to help! 
          Whether you need support or want to share feedback, feel free to reach out to us.
        </p>
        <p className="text-lg mb-6">
          You can contact us via email at 
          <a href="mailto:karunyaganesan2@gmal.com" className="text-yellow-300"> support@studentinfo.com</a> 
         or call us at <span className="font-semibold">+1 (800) 123-4567</span>.
        </p>
        <p className="text-lg">
          We look forward to hearing from you!
        </p>
      </div>
    </div>
  );
}

export default Contact;
