import React from "react";
import ReactDOM from "react-dom";

const loremPicsum = "https://picsum.photos/200";

ReactDOM.render(
  <div>
    <h1 className="heading">My Favourite Foods</h1>
    <div>
      <img
        src="https://www.bhg.com/thmb/B1Mbx1q9AgIEJ8PbQpPq0QPs820=/4000x0/filters:no_upscale():strip_icc()/bhg-recipe-pancakes-waffles-pancakes-Hero-01-372c4cad318d4373b6288e993a60ca62.jpg"
        className="food-image"
        alt="Pancake"
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Borscht_served.jpg"
        className="food-image"
        alt="Borsch"
      />
      <img
        src="https://images.gastronom.ru/vS3eDA6DMddFCsm2Bv0P1yuw1SOCkmLYhYTJo53SwZo/pr:recipe-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzU2OTU3OTRkLTZiYmEtNGI1YS05ZWM1LWViZDVkZWE4MGEyNy5qcGc.webp"
        className="food-image"
        alt="Plov"
      />
    </div>
    <p>My best day of my life:</p>
    {/* В самозакрывающихся тегах слеш в конце обязателен в JSX, но не обязателен в html-файле. */}
    <img src={loremPicsum + "?blur=1"} alt="LoremPicsum" />
  </div>,
  document.getElementById("root")
);
