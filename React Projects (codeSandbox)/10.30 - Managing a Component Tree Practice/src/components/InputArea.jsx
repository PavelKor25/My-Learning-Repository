import React, { useState } from "react";

function InputArea(props) {
  /* Можно бы было оставить данное состояние и ф-цию обработки в App.jsx, но лучше всего размещать
  их там, где они в достаточной мере могут пригодиться. Это сост-е не понадобится в ToDoList */
  const [inputText, setInputText] = useState("");

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  return (
    <div className="form">
      <input onChange={handleChange} type="text" value={inputText} />
      {/* Не буду повторяться, прочти заметку из урока 317 */}
      {/* Анджела предлагает чуть более гибкий вариант передачи, а именно - свойство-функция с одним
      аргументом state, вызов setInputText из функции addItem() перенести сюда, в колбэк функцию.*/}
      <button onClick={() => props.onAction(inputText, setInputText)}>
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
