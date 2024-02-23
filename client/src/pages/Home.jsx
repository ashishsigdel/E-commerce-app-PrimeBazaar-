// FaceComponent.js
import React, { useState } from "react";

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const moveFace = (event) => {
    const x = event.clientX / (window.innerWidth / 110);
    const y = event.clientY / 7;
    setPosition({ x, y });
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-gray-300"
      onMouseMove={moveFace}
    >
      <div
        className="face w-80 max-w-458 aspect-w-1 aspect-h-1 bg-yellow-300 rounded-full flex flex-col justify-around items-center outline-13 border-13 border-solid border-orange-300 shadow-md absolute"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <div className="eyes w-80 h-70 flex justify-between items-center">
          <div className="leftEye w-45 aspect-w-1 aspect-h-1 rounded-full bg-white overflow-hidden shadow-md flex justify-start items-start">
            <div className="leftPupil w-58 h-50 rounded-full bg-black"></div>
          </div>
          <div className="rightEye w-45 aspect-w-1 aspect-h-1 rounded-full bg-white overflow-hidden shadow-md flex justify-start items-start">
            <div className="rightPupil w-58 h-50 rounded-full bg-black"></div>
          </div>
        </div>
        <div className="mouth w-130 h-38 rounded-full bg-gradient-to-br from-yellow-700 to-yellow-300 mb-88 border-2 border-solid border-yellow-400"></div>
      </div>
    </div>
  );
}
