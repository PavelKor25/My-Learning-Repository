/* document.querySelector("button.w.drum").addEventListener("click", handleClick)

function handleClick() {
    alert("Click jomajo!");
} */

var numOfDrumButtons = document.querySelectorAll("button.drum").length;
var drumDirections = ["tom-1", "tom-2", "tom-3", "tom-4", "crash", "kick-bass", "snare"];
var drumSounds = [];

        /* There's all options for adding sound effects using mouse click */

        /*That's REALLY works if you don't want to overlay many sounds*/
    /* // Adding every drum sound effect in array + realisation of drum sounds
for (let i = 0; i < numOfDrumButtons; i++) {
    document.querySelectorAll("button.drum")[i].addEventListener("click", function() {

        var drum = new Audio("./sounds/" + drumDirections[i] + ".mp3");
        drumSounds.push(drum);
        drumSounds[i].play();

    }); 
}*/


        /*That's REALLY works if you don't want to overlay many sounds*/
/* for (var x = 0; x < numOfDrumButtons; x++) {
    var drum = new Audio("./sounds/" + drumDirections[x] + ".mp3");
    drumSounds.push(drum);
}

    // IMPORTANT: For using this Event Listener without mouse click on html-element area
    // we need to connect this one with "document". We need to focus with area with visual buttons
    // for understanding what user presses, that's why other directions require to
    // focus with mouse click.

    // P.S. If I use arrays of Audio elements so same drum will play only when last sound will be ended,
    // beacuse every element of array is static.
    document.addEventListener("keydown", function(event) {
        switch(event.key) {
            case "w":
                drumSounds[0].play();
                break;
            case "a":
                drumSounds[1].play();
                break;
            case "s":
                drumSounds[2].play();
                break;
            case "d":
                drumSounds[3].play();
                break;
            case "j":
                drumSounds[4].play();
                break;
            case "k":
                drumSounds[5].play();
                break;
            case "l":
                drumSounds[6].play();
                break;
            default:
                // alert("LOL");
        }
    }); */

    /* Here's an options of adding sound effects using Keys */


// Adding every drum sound effect in element Audio + realisation of drum sounds (Modified)

// IMPORTANT: For using this Event Listener without mouse click on html-element area
// we need to connect this one with "document". We need to focus with area with visual buttons
// for understanding what user presses, that's why other directions require to
// focus with mouse click.
function makeSound(key) {
    var drum = 0;
    switch (key) {
        case "w":
            drum = new Audio("./sounds/" + drumDirections[0] + ".mp3");
            break;
        case "a":
            drum = new Audio("./sounds/" + drumDirections[1] + ".mp3");
            break;
        case "s":
            drum = new Audio("./sounds/" + drumDirections[2] + ".mp3");
            break;
        case "d":
            drum = new Audio("./sounds/" + drumDirections[3] + ".mp3");
            break;
        case "j":
            drum = new Audio("./sounds/" + drumDirections[4] + ".mp3");
            break;
        case "k":
            drum = new Audio("./sounds/" + drumDirections[5] + ".mp3");
            break;
        case "l":
            drum = new Audio("./sounds/" + drumDirections[6] + ".mp3");
            break;
        default:
            drum = null;
    }
    if(drum != null) {
        drum.play();
    }
}

function btnAnimation(key) {
    var imgClass = "." + key;
    var btnLocation = document.querySelector(imgClass);
    btnLocation.classList.add("pressed");
    setTimeout(function() {
        btnLocation.classList.remove("pressed");
    }, 100);
}

function addBtnAnimation(key) {
    var imgClass = "." + key;
    var btnLocation = document.querySelector(imgClass);
    btnLocation.classList.add("pressed");
}

function removeBtnAnimation(key) {
    var imgClass = "." + key;
    var btnLocation = document.querySelector(imgClass);
    btnLocation.classList.remove("pressed");
}

// Adding Event Listener of button press
document.addEventListener("keydown", function(event) {
    // Отключить повторение звука при зажатии кнопки
    if(event.repeat) {
        return;
    }
    makeSound(event.key);
    addBtnAnimation(event.key);
    });

// Event Listener of button release
document.addEventListener("keyup", function(event) {
    removeBtnAnimation(event.key);
});

// Adding Event Listener of mouse click
for(let i = 0; i < numOfDrumButtons; i++) {
    document.querySelectorAll("button.drum")[i].addEventListener("click", function() {
        var btnTextContent = this.textContent;
        makeSound(btnTextContent);
        btnAnimation(btnTextContent);
    });
}
