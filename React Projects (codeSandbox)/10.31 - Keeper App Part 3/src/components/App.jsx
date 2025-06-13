import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notesArray, setNotesArray] = useState([]);

  function addNote(note) {
    setNotesArray((prevValue) => [...prevValue, note]);
  }

  function deleteNote(id) {
    setNotesArray((prevValue) =>
      prevValue.filter((note, index) => index !== id)
    );
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notesArray.map((note, index) => (
        <Note
          key={index}
          id={index}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
        />
      ))}

      <Footer />
    </div>
  );
}

export default App;
