import React from "react";

/* Универсальный компонент для вывода той или иной информации. В названии свойства-гиперонима
  главная задача здесь - понимать, что в принципе содержит это свойство. */
function Info(props) {
  return <p className="info">{props.detailInfo}</p>;
}

export default Info;
