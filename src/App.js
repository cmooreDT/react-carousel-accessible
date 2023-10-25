import React from "react";
import './App.css';
import Carousel from './Carousel';
import images from "./slides.json";

function App() {
    return (
        <div className="App">
            <header className="App-header">
            <h1>Image Carousel using React and Framer Motion</h1>
            </header>
            <main>
                <Carousel images={images} />
            </main>
        </div>
    );
}

export default App;
