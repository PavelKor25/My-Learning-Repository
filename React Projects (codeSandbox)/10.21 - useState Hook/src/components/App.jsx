import React from "react";

function App() {
  // Установка деструктуризированного массива переменных. Теперь можно обращаться к ним не по индексу, а непосредственно.
  // Первое значение - текущее состояние (изначально указанное в аргументе useState(), а второе значение - ф-ция изменения значения и ререндера)
  const [count, setCount] = React.useState(0);

  function increase() {
    setCount(count + 1);
    console.log("Я Сложился!");
  }

  function decrease() {
    setCount(count - 1);
    console.log("Я Учелся!");
  }

  return (
    <div className="container">
      <h1>{count}</h1>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
}

export default App;
