import React from "react";
import ReactDOM from "react-dom";
/* Названия файлов-компонентов стоит называть с большой буквы
  (Если бы я нпаисал iLoveSandbox.jsx, программа бы сработала, но выдалось бы предупреждение) */
import App from "./ILoveSandbox";

/* Теперь данный код выглядит очень компактно, согласись! */
ReactDOM.render(<App />, document.getElementById("root"));
