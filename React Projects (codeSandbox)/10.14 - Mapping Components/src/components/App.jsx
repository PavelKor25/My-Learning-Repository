import React from "react";
import Card from "./Card";
import contacts from "../contacts";

function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>
      {contacts.map((person) => (
        /* Не важно, используем мы маппинг через колбэк-функцию, или через именованную ф-цию,
          она должна содержать особое свойство key, к-е используется исключительно для определения
          того, с каким элементом массива данных работать, и оно НЕ ИСПОЛЬЗУЕТСЯ для вывода данных!
          (по сути, в html-мире необходима строгость
          в обращении к определенным элементам, особенно эта строгость важна в соприкосновении
          двух миров - Джаваскриптувного и Аштиэмэлошного) */
        <Card
          key={person.id} // Для идентификации элемента массива при маппинге
          id={person.id} // Для вывода номера карты
          name={person.name}
          img={person.imgURL}
          tel={person.phone}
          email={person.email}
        />
      ))}
    </div>
  );
}

export default App;
