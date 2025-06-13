import React, { useState } from "react";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";

function App() {
  /* Состояние-массив находится в ближайшем родительском "общем предке" (App.jsx) всех компонентов, которые взаимод-ют
  с этим сост-ем и обрабатывают его. И вообще, лучшее правило - создание состояний и их обр-чиков лучше всего в
  родительском компоненте, где все дочерние комп-ты вз-ют с ним. */
  const [items, setItems] = useState([]);

  function addItem(inputText, setInputText) {
    setItems((prevItems) => {
      return [...prevItems, inputText];
    });
    setInputText("");
  }

  function deleteItem(id) {
    setItems((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea onAction={addItem} />
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <ToDoItem
              key={index}
              id={index}
              text={todoItem}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
