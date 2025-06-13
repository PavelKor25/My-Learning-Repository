import React from "react";
import ReactDOM from "react-dom";

const fName = "Woody";
const lName = "Woodpecker";
const num = Math.floor(Math.random() * 10);

ReactDOM.render(
  <div>
    <h1>
      Hello {fName} {lName}!
    </h1>
    <p>My lucky number is {num}</p>
  </div>,
  document.getElementById("root")
);
