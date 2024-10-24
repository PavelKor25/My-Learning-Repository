const fs = require("fs");

/* fs.writeFile("my message.txt",
     "That's my first message I have ever written from fs!",
      (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
}); */

fs.readFile("./my message.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
});