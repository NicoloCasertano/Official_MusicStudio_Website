import React, { useEffect, useState } from 'react'
import './Testimonials.css'

const Testimonials = ({slides}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    }

    // useEffect(() => {
    //     const timer = setInterval(nextSlide, 3000)
    //     return () => clearInterval(timer)
    // }, [slides.length])

    const currentSlide = slides[currentIndex];

    return (
        <div className="tml-container">
            <h1>What they say about us</h1>

            <div className="slider">
                <button onClick={prevSlide} className="nav-button prev-button">
                    &lt;
                </button>

                <div className="slide-content">
                    <h3>{currentSlide.name}</h3>
                    <video src={currentSlide.video} controls />
                </div>

                <button onClick={nextSlide} className="nav-button next-button">
                    &gt;
                </button>
            </div>
        </div>
    );
};



export default Testimonials