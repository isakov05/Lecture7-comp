import React, { useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

const DrawingPad = ({ closePad }) => {
  const canvasRef = useRef(null);

  const clearCanvas = () => {
    canvasRef.current.clearCanvas();
  };

  const saveCanvas = async () => {
    const data = await canvasRef.current.exportImage("png");
    console.log("Saved Drawing:", data);
    alert("Drawing saved! (Check console for image data)");
  };

  return (
    <div className="drawing-container">
      <ReactSketchCanvas
        ref={canvasRef}
        strokeWidth={4}
        strokeColor="black"
        canvasColor="white"
        style={{ border: "2px solid black", width: "100%", height: "300px" }}
      />
      <div className="controls">
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={saveCanvas}>Save</button>
        <button onClick={closePad}>Close</button>
      </div>
    </div>
  );
};

export default DrawingPad;
