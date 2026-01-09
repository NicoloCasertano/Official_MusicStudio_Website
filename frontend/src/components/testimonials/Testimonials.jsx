import React, { useEffect, useState } from 'react'
import './Testimonials.css'
import { FaPlay,FaPause } from 'react-icons/fa6';

const Testimonials = ({slides}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevIndex =
        (currentIndex - 1 + slides.length) % slides.length;
    const nextIndex =
        (currentIndex + 1) % slides.length;

    const nextSlide = () => {
        setCurrentIndex((i) => (i + 1) % slides.length);
    }
    const prevSlide = () => {
        setCurrentIndex((i) => (i - 1 + slides.length) % slides.length);
    }

    return (
        <div className="tml-container">
            <h1>THE MUSIC STUDIO YOU NEED</h1>

            <div className="slider">
                <button onClick={prevSlide} className="nav-button prev-button">
                    &lt;
                </button>

                <div className="slide slide-prev">
                    <h3>{slides[prevIndex].name}</h3>
                    <video src={slides[prevIndex].video}></video> 
                </div>

                <div className="slide slide-current">
                    <h3>{slides[currentIndex].name}</h3>
                    <video src={slides[currentIndex].video} controls></video> 
                </div>

                <div className="slide slide-next">
                    <h3>{slides[nextIndex].name}</h3>
                    <video src={slides[nextIndex].video}></video> 
                </div>

                <button onClick={nextSlide} className="nav-button next-button">
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default Testimonials