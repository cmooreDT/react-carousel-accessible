import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = ({images}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('left');

    const slideVariants = {
        hiddenRight: {
            x: "100%",
            opacity: 0,
        },
        hiddenLeft: {
            x: "-100%",
            opacity: 0,
        },
        visible: {
            x: "0",
            opacity: 1,
            transition: {
                duration: 1,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.5,
            },
        },
    };

    const sliderVariants = {
        hover: {
            scale: 1.2,
        },
    };

    const dotsVariants = {
        initial: {
            y: 0,
        },
        animate: {
            y: 0,
            scale: 1.3,
            transition: { stiffness: 1000, damping: "10" },
        },
        hover: {
            scale: 1.1,
            transition: { duration: 0.2 },
        },
    };

    const handleNext = () => {
        setDirection("right");
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 === images.length ? 0 : prevIndex + 1
        );
    }
    const handlePrevious = () => {
        setDirection("left");
        setCurrentIndex((prevIndex) =>
            prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
        );
    };
    const handleDotClick = (index) => {
        setDirection(index >  currentIndex ? "right" : "left");
        setCurrentIndex(index);
    }

    return (
        <div className="carousel" role="region" aria-roledescription="carousel" aria-label="Cat Facts">
            <div className="carousel-images" role="group" aria-roledescription="slide">
                <AnimatePresence>
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        variants={slideVariants}
                        initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
                        animate="visible"
                        exit="exit"
                        alt={`Image ${currentIndex + 1}`} />
                </AnimatePresence>

                <div className="slide_direction" role="group" aria-label="Slide controls">
                    <motion.button
                        variants={sliderVariants}
                        whileHover="hover"
                        className="left"
                        onClick={handlePrevious}
                        aria-label="Previous image">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            viewBox="0 96 960 960"
                            width="20">
                            <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
                        </svg>
                    </motion.button>
                    <motion.button
                        variants={sliderVariants}
                        whileHover="hover"
                        className="right"
                        onClick={handleNext}
                        aria-label="Next image">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            viewBox="0 96 960 960"
                            width="20">
                            <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
                        </svg>
                    </motion.button>
                </div>
            </div>

            <div className="carousel-indicator" role="group" aria-label="Slide indicators">
                {images.map((_, index) => (
                    <motion.button
                        key={index}
                        className={`dot ${currentIndex === index ? "active" : ""}`}
                        onClick={() => handleDotClick(index)}
                        initial="initial"
                        animate={currentIndex === index ? "animate" : ""}
                        whileHover="hover"
                        variants={dotsVariants}
                        aria-label={`${currentIndex === index ? "Current" : "Show"} Image ${index + 1} of ${images.length}`}>
                    </motion.button>
                ))}
            </div>
        </div>
    )
};
export default Carousel;