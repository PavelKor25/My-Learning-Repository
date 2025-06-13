import React from "react";
import Avatar from "./Avatar";
import Info from "./Info";

function Card(props) {
  return (
    <div className="card">
      <div className="top">
        <h2 className="name">{props.name}</h2>
        <Avatar img={props.img} />
      </div>
      <div className="bottom">
        {/* Существуют универсальные по построению компоненты, выполняющие
          идентичную задачу для схожих по сути свойствв РОДИТЕЛЬСКОГО компонента
          Но даже универсальные компоненты должны соблюдать строгость в наименовании
          свойств. detailInfo - это не ключевое слово, а созданною мною свойство. */}
        <Info detailInfo={props.tel} />
        <Info detailInfo={props.email} />
      </div>
    </div>
  );
}

export default Card;
