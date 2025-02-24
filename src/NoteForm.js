import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { FaPencilAlt } from "react-icons/fa";
import "react-quill/dist/quill.snow.css";

// Custom Toolbar Component
const CustomToolbar = () => (
  <div id="toolbar">
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-underline"></button>
    <button className="ql-list" value="ordered"></button>
    <button className="ql-list" value="bullet"></button>
    <button className="ql-align"></button>
    <button className="ql-clean"></button>
    {/* Custom Pencil Button */}
    <button className="ql-pencil">
      <FaPencilAlt />
    </button>
  </div>
);

// Quill Editor Modules (Includes Custom Handler)
const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      pencil: function () {
        document.dispatchEvent(new Event("toggleDrawing"));
      },
    },
  },
};

const NoteForm = ({ addNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showDrawingPad, setShowDrawingPad] = useState(false);
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(null);

  // Listen for the pencil button click to toggle drawing pad
  useEffect(() => {
    const toggleDrawingHandler = () => setShowDrawingPad((prev) => !prev);
    document.addEventListener("toggleDrawing", toggleDrawingHandler);
    return () =>
      document.removeEventListener("toggleDrawing", toggleDrawingHandler);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let savedDrawing = null;
    if (canvasRef.current) {
      savedDrawing = await canvasRef.current.exportImage("png");
    }

    if (title.trim() && content.trim()) {
      addNote({ title, content, drawing: savedDrawing });
      setTitle("");
      setContent("");
      setDrawing(null);
      setShowDrawingPad(false);
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* Custom Toolbar */}
      <CustomToolbar />

      {/* Quill Editor */}
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={modules}
        placeholder="Write your note here..."
      />

      {showDrawingPad && (
        <div className="drawing-container">
          <ReactSketchCanvas
            ref={canvasRef}
            strokeWidth={4}
            strokeColor="black"
            canvasColor="white"
            style={{
              border: "2px solid black",
              width: "100%",
              height: "300px",
            }}
          />
          <button type="button" onClick={() => canvasRef.current.clearCanvas()}>
            Clear Drawing
          </button>
        </div>
      )}

      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;
