var randNum1 = Math.floor(Math.random() * 6) + 1,
    randNum2 = Math.floor(Math.random() * 6) + 1;
var firstDiceImg = document.querySelectorAll(".dice")[0],
    secondDiceImg = document.querySelectorAll(".dice")[1],
    title = document.querySelector("h1"),
    randImgSrc1 = "./images/dice" + randNum1 + ".png",
    randImgSrc2 = "./images/dice" + randNum2 + ".png";

    // Very clever option!
    firstDiceImg.setAttribute("src", randImgSrc1);
    secondDiceImg.setAttribute("src", randImgSrc2);

    // My alt option (Very good in my opinion)
/*     // Random select of the first dice
switch(randNum1) {
    case 1:
        firstDiceImg.setAttribute("src", "./images/dice1.png");
        break;
    case 2:
        firstDiceImg.setAttribute("src", "./images/dice2.png");
        break;
    case 3:
        firstDiceImg.setAttribute("src", "./images/dice3.png");
        break;
    case 4:
        firstDiceImg.setAttribute("src", "./images/dice4.png");
        break;
    case 5:
        firstDiceImg.setAttribute("src", "./images/dice5.png");
        break;
    case 6:
        firstDiceImg.setAttribute("src", "./images/dice6.png");
        break;
    default:
        alert("Fix first random number.");
}

    // Random select of the second dice
    switch(randNum2) {
        case 1:
            secondDiceImg.setAttribute("src", "./images/dice1.png");
            break;
        case 2:
            secondDiceImg.setAttribute("src", "./images/dice2.png");
            break;
        case 3:
            secondDiceImg.setAttribute("src", "./images/dice3.png");
            break;
        case 4:
            secondDiceImg.setAttribute("src", "./images/dice4.png");
            break;
        case 5:
            secondDiceImg.setAttribute("src", "./images/dice5.png");
            break;
        case 6:
            secondDiceImg.setAttribute("src", "./images/dice6.png");
            break;
        default:
            alert("Fix second random number.");
} */

if(randNum1 > randNum2) {
    title.textContent = "Player 1 wins!";
} else if (randNum1 < randNum2) {
    title.textContent = "Player 2 wins!";
} else {
    title.textContent = "Draw!";
}