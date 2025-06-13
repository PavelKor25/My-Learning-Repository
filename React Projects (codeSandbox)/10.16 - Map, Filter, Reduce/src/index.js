var numbers = [3, 56, 2, 48, 5];

//Map -Create a new array by doing something with each item in an array.

console.log("Маппинг: " + numbers.map((num) => num ** 2));

//Filter - Create a new array by keeping the items that return true.

console.log("Фильтр: " + numbers.filter((num) => num > 10));

//Reduce - Accumulate a value by doing something to each item in an array.

console.log(
  "Сведение значений: " +
    numbers.reduce((accumulator, currentNum) => {
      console.log("прошлый результат: " + accumulator);
      console.log("прибавка: " + currentNum);
      return accumulator + currentNum;
    })
);

//Find - find the first item that matches from an array.
console.log(
  "Поиск первого значения по условию: " + numbers.find((num) => !(num % 6))
);

//FindIndex - find the index of the first item that matches.

console.log(
  "Поиск первого индекса значения по условию этого значения: " +
    numbers.findIndex((num) => !(num % 6))
);

/* -----ПРАКТИЧЕСКИЙ СЕГМЕНТ----- */

import emojipedia from "./emojipedia";

const array_1 = emojipedia.map((emojiCard) => emojiCard.meaning.slice(0, 100));
console.log(array_1);

const phrase = "also used";
const array_2 = emojipedia.filter((emojiCard) => {
  const lowerCaseExplain = emojiCard.meaning.toLowerCase();
  return lowerCaseExplain.includes(phrase);
});
console.log(array_2);
