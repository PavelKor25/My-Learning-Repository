import React from "react";
import Card from "./Card";
import contacts from "../contacts";

function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>
      {/* Как вариант */}
      {/* <Card
        name="Beyonce"
        image="https://blackhistorywall.files.wordpress.com/2010/02/picture-device-independent-bitmap-119.jpg"
        phone="+123 456 789"
        email="b@beyonce.com"
      />
      <Card
        name="Harry Potter"
        image="https://www.irishtimes.com/resizer/v2/3MS3PYEKJI2N533Z3ZG6VJ2RKU.jpg?auth=ed5a96fa93094531cc4a7b11790b56553c48b6e2b3527cfc782796d8fdc28b99&smart=true&width=1600&height=1200"
        phone="+255 350 137"
        email="har@old.com"
      />
      <Card
        name="Eminem"
        image="https://nypost.com/wp-content/uploads/sites/2/2019/10/gettyimages-187596325.jpg?quality=75&strip=all&w=744"
        phone="8 800 123 45"
        email="emma@stone.com"
      /> */}

      <Card
        name={contacts[0].name}
        image={contacts[0].imgURL}
        phone={contacts[0].phone}
        email={contacts[0].email}
      />
      <Card
        name={contacts[1].name}
        image={contacts[1].imgURL}
        phone={contacts[1].phone}
        email={contacts[1].email}
      />
      <Card
        name={contacts[2].name}
        image={contacts[2].imgURL}
        phone={contacts[2].phone}
        email={contacts[2].email}
      />
    </div>
  );
}

export default App;
