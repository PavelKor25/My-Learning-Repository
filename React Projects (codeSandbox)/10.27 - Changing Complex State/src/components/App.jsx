import React from "react";

function App() {
  const [fullName, setFullName] = React.useState({
    fName: "",
    lName: "",
  });

  function handleFullName(event) {
    // Для деструктурированных объектов можно создавать псевдонимы (то, что после двоеточия)
    const { name: inputName, value: newValue } = event.target;

    // Эта запись ни разу не компактна, но позволяет показать механику комплексной обработки состояний
    if (inputName === "fName") {
      // Закомментированная запись не будет работать, поскольку prevValue встроено как константное значение в setState
      // и ее нельзя менять.
      // setFullName((prevValue) => (prevValue.fName = newValue));
      setFullName((prevValue) => {
        return {
          fName: newValue,
          lName: prevValue.lName,
        };
      });
    } else if (inputName === "lName") {
      setFullName((prevValue) => {
        return {
          fName: prevValue.fName,
          lName: newValue,
        };
      });
    }
    /* setFullName((prevState) => {
      return {
        ...prevState,
        [inputName]: newValue,
      };
    }); */
  }

  return (
    <div className="container">
      <h1>
        Hello {fullName.fName} {fullName.lName}
      </h1>
      <form>
        <input
          onChange={handleFullName}
          value={fullName.fName}
          name="fName"
          placeholder="First Name"
        />
        <input
          onChange={handleFullName}
          value={fullName.lName}
          name="lName"
          placeholder="Last Name"
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
