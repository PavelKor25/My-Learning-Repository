var primeNums = [2, 3, 5, 7, 11];
const countOfPrimeNums = 100;

function isPrime(num) {
    if(num <= 1) {
        return false;
    }
    for(var i = 0; i < primeNums.length; i++) {
        if(primeNums[i] > Math.sqrt(num)) {
            break;
        }
        if(!(num % primeNums[i])) {
            return false;
        }
    }
    return true;
}

function getTwoPrimeNumsWithSpacing(spacing) {          // Выводит каждую пару чисел, расположенные на расстоянии >= интервала между ними
    for(var g = 0; g < primeNums.length - 1; g++) {
        if(primeNums[g + 1] - primeNums[g] >= spacing) {
            console.log(primeNums[g], "     ", primeNums[g + 1]);
        }
    }
}

function getDigits(num) {
    var digit = num;        // Цифра числа num
    var divider = 0;        // Делитель num вида 10 в степени n.
    var digits = [];        // Цифры числа num, начиная с единиц

    for(var dig = 1; divider <= num; dig++) {
        divider = Math.pow(10, dig);
        digit = num % divider;

        // Выводим n-ную цифру числа num
        for(var i = 0; i < digits.length; i++) {
            digit -= digits[i];
            digit /= 10;
        }

        digits.push(digit);
    }
    return digits;
}

function isPalyndrome(num) {
    var isEven = false;     // Признак четности количества цифр числа num (по стандарту нечетно)
    var numDigits = getDigits(num);

    if(numDigits.length % 2 === 0) {
        isEven = true;
    }

    var countFirstHalfOfDigs = isEven ? numDigits.length / 2 : (numDigits.length - 1) / 2;    // кол-во первой половины цифр числа num
    
    for (var dig = 0; dig < countFirstHalfOfDigs; dig++) {
        if(numDigits[dig] !== numDigits[numDigits.length - 1 - dig]) {
            return false;
        }
    }

    return true;
}

// Выводит н-ное количество простых чисел в массив
for(var c = 12; primeNums.length < countOfPrimeNums; c++) {
    if(isPrime(c)) {
        primeNums.push(c);
    }
}

/* for(var a = 0; a < primeNums.length; a++) {
    console.log(primeNums[a]);
} */

/* getTwoPrimeNumsWithSpacing(50); */

/* for(var x = 0; x <= primeNums.length; x++) {
    if(isPalyndrome(primeNums[x])) {
        console.log(primeNums[x]);
    }
} */

var ratio = 1;

for(var a = 0; a < primeNums.length; a++) {
    ratio *= ((primeNums[a] - 1) / primeNums[a]);
    console.log(ratio);
    console.log(primeNums[a]);
}
/* console.log(ratio);
console.log(primeNums[primeNums.length - 1]); */

