import React from "react";

function App() {
  let [time, setTime] = React.useState(new Date().toLocaleTimeString());
  console.log(time);

  function updateTime() {
    setTime(new Date().toLocaleTimeString());
    return time;
  }

  /* Данная функция является глобальной в JavaScript. Она обновляет другую функцию, которая
  вызывается первым аргументом, а вторым устанавливает в миллисекундах интервал повторного
  использования этой функции. Важно в первую очередь ввести интервал, а потом функцию во избежание
   вылета программы */
  // Закомментируй, если хочешь проверить кнопку "Get Time".
  setInterval(updateTime, 1000);

  return (
    <div className="container">
      <h1>{time}</h1>
      <button onClick={updateTime}>Get Time</button>
    </div>
  );
}

export default App;
