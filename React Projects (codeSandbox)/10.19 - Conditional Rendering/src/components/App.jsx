import React from "react";
import Login from "./Login";

var isLoggedIn = false;
const currentTime = new Date(2021, 1, 1, 13).getHours();
console.log(currentTime);

function App() {
  return (
    <div className="container">
      {/* Ternary operator (условный оператор с двумя исходами) */}
      {/* {isLoggedIn ? <h1>Hello</h1> : <Login />} */}
      {/* AND Operator (условный оператор "в одну сторону") */}
      {/* {currentTime > 12 && <h1>Why are you still working?</h1>} */}
    </div>
  );
}

export default App;
