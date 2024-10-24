/* var generateName = require('sillyname'); */     // Запросить с модуля объект (или метод, как в данном случае) для работы с ним

/* import generateName from "sillyname";           // Запросить с модуля объект (или метод, как в данном случае) для работы с ним
var sillyName = generateName();                 // Работа с этим методом

console.log(`My name is ${sillyName}.`) */

import {randomSuperhero} from 'superheroes';

console.log(`I'm a Man. A good Man. I'm a ${randomSuperhero()}!!!`);