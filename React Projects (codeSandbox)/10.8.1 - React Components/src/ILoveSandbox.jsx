import React from "react";

/* Сравните с файлом "10.8". Здесь все доведено до кондиции */

function Heading() {
  return <h1>I REALLY love CodeSandbox! Because:</h1>;
}

function List() {
  return (
    <ul>
      <li>I can't save new file with a same name</li>
      <li>Even if I deleted previous file</li>
      <li>Because of cashing problems which I can't solve</li>
      <li>Because terminal is not avaliable here!</li>
    </ul>
  );
}

function App() {
  return (
    <div>
      <Heading />
      <List />
    </div>
  );
}

export default App;
