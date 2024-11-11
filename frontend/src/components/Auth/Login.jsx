import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // For password visibility toggle
import two from '../../assets/images/two.png';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState(''); // For storing email
  const [password, setPassword] = useState(''); // For storing password
  const [error, setError] = useState(''); // For generic errors
  const [showPassword, setShowPassword] = useState(false); // For showing/hiding password
  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');  // Reset the error message

    // Trim spaces and validate input
    const trimmedUser = user.trim();
    const trimmedPassword = password.trim();

    // Basic validation: Check if email and password are provided
    if (!trimmedUser || !trimmedPassword) {
      setError('Both email and password are required.');
      return;
    }

    // Email validation: Check if email is in proper format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/;
    if (!emailRegex.test(trimmedUser)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Password validation: Check if password is long enough
    if (trimmedPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Attempt to sign in with Firebase authentication
    try {
      await signInWithEmailAndPassword(auth, trimmedUser, trimmedPassword);
      alert('Login Successful');
      navigate('/profile'); // Redirect on success
    } catch (firebaseError) {
      // Handle generic Firebase error here (invalid credentials)
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-customViolet items-center">
      <div className="flex w-full md:w-1/2 justify-center p-6">
        <img src={two} alt="student" className="w-3/4 h-34 md:w-full max-w-md rounded-lg shadow-lg" />
      </div>
      <div className="flex items-center justify-center w-full md:w-1/2 p-6">
        <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleLogin}>
          <h1 className="text-2xl font-bold text-center mb-6">Login to your Account!</h1>
          
          {/* Email Input */}
          <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Email Address</label>
          <div className="relative">
            <input 
              type="text" 
              className="w-full p-2 mb-2 border border-gray-300 rounded" 
              value={user} 
              onChange={(e) => {
                setUser(e.target.value);
                setError(''); // Clear error when user starts typing
              }} 
              autoComplete="off" 
              placeholder="example@gmail.com"
            />
          </div>

          {/* Password Input */}
          <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              className="w-full p-2 mb-2 border border-gray-300 rounded" 
              value={password} 
              onChange={(e) => {
                setPassword(e.target.value);
                setError(''); // Clear error when user starts typing
              }} 
              placeholder="Minimum 6 characters"
            />
            <button 
              type="button" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icon */}
            </button>
          </div>

          {/* General Error Message */}
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <button type="submit" className="w-full bg-customRegister text-white p-2 rounded hover:bg-violet-500">Login</button>
          <p className="text-center mt-4">Not a user? <a href="/register" className="text-violet-500">Register here</a></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
