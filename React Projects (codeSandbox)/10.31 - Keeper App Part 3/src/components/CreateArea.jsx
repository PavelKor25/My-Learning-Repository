import React, { useState } from "react";

function CreateArea(props) {
  const [noteText, setNoteText] = useState({
    title: "",
    content: "",
  });

  function handleNote(event) {
    const { value: newValue, name } = event.target;
    setNoteText((prevValue) => ({
      ...prevValue,
      [name]: newValue,
    }));
  }

  return (
    <div>
      <form
        onSubmit={(event) => {
          props.onAdd(noteText);
          setNoteText({
            title: "",
            content: "",
          });
          event.preventDefault();
        }}
      >
        <input
          name="title"
          placeholder="Title"
          value={noteText.title}
          onChange={handleNote}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={noteText.content}
          onChange={handleNote}
        />
        <button name="addBtn" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
