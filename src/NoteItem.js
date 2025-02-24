import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const NoteItem = ({ note, deleteNote }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="note">
      <h3 onClick={() => setExpanded(!expanded)}>{note.title}</h3>
      {expanded ? (
        <p dangerouslySetInnerHTML={{ __html: note.content }}></p>
      ) : (
        <p
          dangerouslySetInnerHTML={{
            __html: note.content.substring(0, 50) + "",
          }}
        ></p>
      )}

      {/* Show Drawing If Available */}
      {note.drawing && (
        <img src={note.drawing} alt="Note Drawing" className="note-drawing" />
      )}

      <button className="delete-btn" onClick={() => deleteNote(note.title)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default NoteItem;
