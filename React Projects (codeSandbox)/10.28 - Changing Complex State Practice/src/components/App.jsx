import React, { useState } from "react";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: "",
  });

  function handleContact(event) {
    const { value: newValue, name: inputName } = event.target;

    setContact((prevValue) => {
      switch (inputName) {
        case "fName":
          return {
            fName: newValue,
            lName: prevValue.lName,
            email: prevValue.email,
          };
          break;
        case "lName":
          return {
            fName: prevValue.fName,
            lName: newValue,
            email: prevValue.email,
          };
          break;
        case "email":
          return {
            fName: prevValue.fName,
            lName: prevValue.lName,
            email: newValue,
          };
          break;
        default:
          console.log("Проверь условие switch и наименования в инпуте.");
      }
    });
  }
  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form>
        <input
          name="fName"
          value={contact.fName}
          onChange={handleContact}
          placeholder="First Name"
        />
        <input
          name="lName"
          value={contact.lName}
          onChange={handleContact}
          placeholder="Last Name"
        />
        <input
          name="email"
          value={contact.email}
          onChange={handleContact}
          placeholder="Email"
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
