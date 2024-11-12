import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy loading components for improved performance
const Home = lazy(() => import('./components/Auth/Home'));
const Register = lazy(() => import('./components/Auth/Register'));
const Login = lazy(() => import('./components/Auth/Login'));
const Profile = lazy(() => import('./components/Students/Profile'));


// Loading fallback component
const Loading = () => <div>Loading...</div>;

// 404 Not Found component
const NotFound = () => <div>404 - Page Not Found</div>;

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
