import React from "react";
import NoteItem from "./NoteItem";

const NoteList = ({ notes, deleteNote }) => {
  return (
    <div className="note-list">
      {notes.length === 0 ? (
        <p>No notes yet. Start adding some!</p>
      ) : (
        notes.map((note, index) => (
          <NoteItem key={index} note={note} deleteNote={deleteNote} />
        ))
      )}
    </div>
  );
};

export default NoteList;
