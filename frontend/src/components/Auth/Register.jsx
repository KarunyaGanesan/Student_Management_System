import { useState } from 'react';
import one from '../../assets/images/one.png';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Import FontAwesome icons

function Register() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setFormError('');
    setSuccessMessage('');

    // Check if fields are empty
    if (!user || !password || !confirmPassword) {
      setFormError("All fields are required");
      return;
    }

    // Validate Gmail format
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(user)) {
      setEmailError("Please enter a valid Gmail address");
      return;
    }

    // Password length validation
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    // Register the user
    createUserWithEmailAndPassword(auth, user, password)
      .then(() => {
        setSuccessMessage("Registered successfully!");
        setTimeout(() => {
          navigate('/login');
        }, 2000); // 2-second delay for the success message
      })
      .catch((error) => {
        // Check for specific Firebase error codes
        if (error.code === 'auth/email-already-in-use') {
          setEmailError("User already exists. Please use a different email.");
        } else {
          setEmailError("Registration failed. Please try again.");
        }
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-customViolet items-center">
      <div className="flex w-full md:w-1/2 justify-center p-6">
        <img src={one} alt="student" className="w-3/4 h-34 md:w-full max-w-md rounded-lg shadow-lg" />
      </div>
      <div className="flex items-center justify-center w-full md:w-1/2 p-6">
        <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleRegister}>
          <h1 className="text-2xl font-bold text-center mb-6">Create your Account!</h1>
          <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Gmail Address</label>
          <input 
            type="text" 
            className={`w-full p-2 mb-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded`} 
            value={user} 
            onChange={(e) => setUser(e.target.value)} 
            placeholder="example@gmail.com"
            onFocus={() => setEmailError('')} // Clear error when user focuses
          />
          {emailError && <p className="text-red-500 mb-2 ml-3">{emailError}</p>}

          <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Password</label>
          <div className="relative">
            <input 
              type={passwordVisible ? 'text' : 'password'} 
              className={`w-full p-2 mb-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded`} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Minimum 6 characters"
              onFocus={() => setPasswordError('')} // Clear error when user focuses
            />
            <button 
              type="button" 
              className="absolute right-3 top-2 text-gray-500"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}  {/* Show/Hide icon */}
            </button>
          </div>
          {passwordError && <p className="text-red-500 mb-2 ml-3">{passwordError}</p>}

          <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Confirm Password</label>
          <div className="relative">
            <input 
              type={confirmPasswordVisible ? 'text' : 'password'} 
              className={`w-full p-2 mb-2 border ${confirmPasswordError ? 'border-red-500' : 'border-gray-300'} rounded`} 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="Confirm your password"
              onFocus={() => setConfirmPasswordError('')} // Clear error when user focuses
            />
            <button 
              type="button" 
              className="absolute right-3 top-2 text-gray-500"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}  {/* Show/Hide icon */}
            </button>
          </div>
          {confirmPasswordError && <p className="text-red-500 mb-2 ml-3">{confirmPasswordError}</p>}

          {formError && <p className="text-red-500 mb-4 text-center">{formError}</p>}
          {successMessage && <p className="text-green-500 mb-4 text-center">{successMessage}</p>}

          <button type="submit" className="w-full bg-customRegister text-white p-2 rounded hover:bg-violet-500">Register</button>
          <p className="text-center mt-4">Already a user? <a href="/login" className="text-violet-500">Login here</a></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
