import React, { useState, useEffect } from "react";
import Header from "./Header";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState([]);

  // Load notes from localStorage on startup
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const deleteNote = (title) => {
    setNotes(notes.filter((note) => note.title !== title));
  };

  return (
    <div className="app">
      <Header />
      <NoteForm addNote={addNote} />
      <NoteList notes={notes} deleteNote={deleteNote} />
    </div>
  );
};

export default App;
