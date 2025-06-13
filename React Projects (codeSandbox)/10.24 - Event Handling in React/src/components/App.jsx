import React from "react";

function App() {
  const [heading, setHeading] = React.useState("Hello");
  const [bgColor, setBgColor] = React.useState("white");

  function handleClick() {
    setHeading("What's up?");
  }

  function handleMouseOver() {
    /* Ага! Глагол здесь mouse, а не over! */
    console.log("Moused Over!");
    setBgColor("black");
  }

  function handleMouseOut() {
    console.log("Moused Out!");
    setBgColor("white");
  }

  return (
    <div className="container">
      <h1>{heading}</h1>
      <input type="text" placeholder="What's your name?" />
      <button
        style={{ backgroundColor: bgColor }}
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
