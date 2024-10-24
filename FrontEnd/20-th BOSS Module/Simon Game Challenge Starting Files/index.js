var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameIsStarted = false;
var gameIsOver = false;
var level = 0;

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// УЖАСАЮЩАЯ функция! Она означает, что ты проиграл!
function startOver() {
    gameIsOver = true;
    gamePattern = [];
    level = 0;
}

function checkAnswer(currentLevel) {
        if(gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {
            /* Однажды неверно сыгранная кнопка возвращает всю игру в начало и обнуляет все переменные */

            // Эффекты при неверном ответе
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);

            startOver();

            // Текст после УЖАСАЮЩЕГО поражения, от которого хочется плакать!
            $("#level-title").text("Game Over, Guy, I'm So Sorry. Please, don't Cry and Press Any Key to Restart");
        } else {
            // Если все кнопки были сыграны верно, то выполнится следующее условие и запустится следующий уровень
            // (невозможен случай, когда длина нижеописанного массива будет равняться значению level при наличии
            // неверно сыгранных кнопок, смотрите комментарий if выше)
            if(userClickedPattern.length === gamePattern.length) {
                setTimeout(function() {
                    nextSequence();
                }, 1000);
            }
        }
}

// Чтобы обработчик событий вызывался лишь однажды и не накладывался на себя, необходимо
// использовать ГЛОБАЛЬНЫЙ метод, а не вложенный в функцию
$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randNum = Math.floor(Math.random() * 4);
    var randChosenColour = buttonColours[randNum];

    gamePattern.push(randChosenColour);

    $("#" + randChosenColour).fadeOut(100).fadeIn(100);
    
    playSound(randChosenColour);
}

$(document).on("keydown", function(event) {
    // Первая итерация игры
    if((event.key === "a" || event.key === "A") && !gameIsStarted) {
        gameIsStarted = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
    // Новая игра после УЖАСАЮЩЕГО, трудновыносимого поражения, которого не оставит равнодушным никого!
    if(gameIsOver) {
        gameIsOver = false;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
})





