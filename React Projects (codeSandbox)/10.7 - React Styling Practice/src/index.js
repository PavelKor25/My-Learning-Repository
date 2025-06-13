//Create a React app from scratch.
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.

import React from "react";
import ReactDOM from "react-dom";

let greetings = "Greetings";
let greetColor = "black";
const hours = new Date().getHours();
console.log(hours);

if (hours >= 0 && hours < 12) {
  greetings = "Good morning";
  greetColor = "red";
} else if (hours >= 12 && hours < 18) {
  greetings = "Good afternoon";
  greetColor = "green";
} else {
  greetings = "Good evening";
  greetColor = "blue";
}
ReactDOM.render(
  <div>
    <h1 class="heading" style={{ color: greetColor }}>
      {greetings}
    </h1>
  </div>,
  document.getElementById("root")
);
