import React from "react";
import ReactDOM from "react-dom";

/* ВАЖНО: В css-файлах исп-ся css-объекты, которые на самом деле являются js-объектами.
    Разница в JSX-файле лишь в том, что названия параметра стиля надо писать не-так (как в css),
    а вотТак, как и в любых js-объектах, да и сам параметр необх. писать в кавычках. */
const customStyle = {
  color: "green",
  fontStyle: "italic",
  fontSize: "20px",
  border: "3px solid black",
};

/* Раскрой коммент ниже, и по сути мы изменим объект customStyle */
// customStyle.color = "blue";

ReactDOM.render(
  <div>
    {/* Аттрибут стиля в JSX, в отличие от html файла, принимант не строки, а js-объекты.
        Чтобы этот объект (по сути - выражение) вывести внутри html-блока в JSX,
        то необходимо это выражени обрамить фигурными скобками. Поэтому здесь двойные
        фигурные скобки: одни для выражения (см. проект 10.3), другие для объекта.
        (Кстати, даже этот комментарий требует обрамления {} для понимания кодом, что это
        js-сегмент внутри html.)  */}
    <h1 style={{ color: "red" }}>Hello World!</h1>
    <p style={customStyle}>
      Somebody once told me the world is gonna roll me...
    </p>
  </div>,
  document.getElementById("root")
);
