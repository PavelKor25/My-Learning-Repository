import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";

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
