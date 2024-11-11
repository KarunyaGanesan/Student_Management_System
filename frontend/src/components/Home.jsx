import React, { useState, useEffect } from 'react';
import one from '../assets/images/home1.jpg';
import two from '../assets/images/home2.jpg';
import three from '../assets/images/home3.jpg';
import four from '../assets/images/home4.jpg';
import five from '../assets/images/home5.jpg';

function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [one, two, three, four, five];

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 3000);
        return () => clearInterval(slideInterval);
    }, [slides.length]);

    // Inline style for smooth background-image transition
    const backgroundStyle = {
        backgroundImage: `url(${slides[currentSlide]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in-out',
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center text-white"
            style={backgroundStyle}
        >
            <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg text-center max-w-lg">
                <h1 className="text-4xl font-bold mb-4">Welcome to Our Student Management System!</h1>
                <p className="text-lg mb-6">Manage students easily, securely, and efficiently.</p>
                
                <div className="flex gap-4">
                    <a href="/register" className="bg-violet-500 text-white px-6 py-2 rounded hover:bg-violet-600 transition-colors duration-200">
                        Register
                    </a>
                    <a href="/login" className="bg-white text-violet-500 px-6 py-2 rounded hover:bg-violet-200 transition-colors duration-200">
                        Login
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Home;
