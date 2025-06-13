import React from "react";

function Heading() {
  return <h1>My Favourite Foods</h1>;
}

function List() {
  return (
    <ul>
      <li>Bacon</li>
      <li>Jamon</li>
      <li>Noodles</li>
    </ul>
  );
}

/* Экспорт производится для конкретной функции. Здесь это функция Heading. Данный Экспорт
    стандартный, т е подразусевает использование общего имени: import Something from "./Heading"
    Эта команда и будет импортировать Heading (последнее утверждение неподтвержденное) */
export default Heading;
/* А это комбинированный экспорт каждой указанной функции. В импорте необходимо указать точное название
    модуля (функции) в фигурных скобках */
export { Heading, List };

/* Забегая вперед, можно импортировать любые переменные, в т ч объекты */
