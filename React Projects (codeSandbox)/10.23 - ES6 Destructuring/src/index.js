// CHALLENGE: uncomment the code below and see the car stats rendered
import React from "react";
import ReactDOM from "react-dom";
import cars from "./practice";

const [honda, tesla] = cars;

// Альтернативный вариант (мне он здесь больше нравится)
/* const [hondaTopSpeed, teslaTopSpeed] = [
  honda.speedStats.topSpeed,
  tesla.speedStats.topSpeed,
]; */
const {
  speedStats: { topSpeed: hondaTopSpeed },
} = honda;
const {
  speedStats: { topSpeed: teslaTopSpeed },
} = tesla;
/* const [hondaTopColour, teslaTopColour] = [
  honda.coloursByPopularity[0],
  tesla.coloursByPopularity[0],
]; */
const {
  coloursByPopularity: [
    hondaTopColour /* второй элемент, который не используется, а значит, можно не записывать */,
  ],
} = honda;
const {
  coloursByPopularity: [teslaTopColour],
} = tesla;

ReactDOM.render(
  <table>
    <tr>
      <th>Brand</th>
      <th>Top Speed</th>
      <th>Top Colour</th>
    </tr>
    <tr>
      <td>{tesla.model}</td>
      <td>{teslaTopSpeed}</td>
      <td>{teslaTopColour}</td>
    </tr>
    <tr>
      <td>{honda.model}</td>
      <td>{hondaTopSpeed}</td>
      <td>{hondaTopColour}</td>
    </tr>
  </table>,
  document.getElementById("root")
);
