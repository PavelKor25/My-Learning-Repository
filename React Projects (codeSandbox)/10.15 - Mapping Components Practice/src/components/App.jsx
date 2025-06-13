import React from "react";
import Entry from "./Entry";
import emojipedia from "../emojipedia";

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">
        {emojipedia.map((term) => (
          <div className="term">
            <Entry
              key={term.id}
              emojiPicture={term.emoji}
              emojiName={term.name}
              detail={term.meaning}
            />
          </div>
        ))}
      </dl>
    </div>
  );
}

export default App;
