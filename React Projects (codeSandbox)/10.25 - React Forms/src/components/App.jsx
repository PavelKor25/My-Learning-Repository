import React from "react";

function App() {
  /* Есть одна тонкая и неочевидная деталь, которую стоит прояснить: первое значение (name)
    выводится как константа, и не является переменной состояния. Но эта константа ссылается на данное
    состояние, которое, конечно же, явлеятся переменной. name объявлена как константа для того, чтобы
    программист не мог его менять открыто (а только взакрытую, с помощью useState()).*/
  const [name, setName] = React.useState("");
  const [userSubmitted, setUserSubmit] = React.useState(false);

  function handleName(event) {
    console.log(event.target.value);
    setName(event.target.value);
  }

  function setGreeting() {
    setUserSubmit(true);
  }

  return (
    <div className="container">
      <h1>{userSubmitted ? "Hey, " + name + ", what's up?" : "Hello"}</h1>
      <form>
        <input
          onChange={handleName}
          type="text"
          placeholder="What's your name?"
          /* Аттрибут value критически важен для дальнейшей обработки сервером. Value здесь обновляет значение
        после каждого введенного символа, таким образом реагируя динамически */
          value={name}
        />
        <button onClick={setGreeting}>Submit</button>
      </form>
    </div>
  );
}

export default App;
