var btnColors = ["red", "green", "blue", "yellow"];     // Список цветов у кнопок
var gamePattern = [];                                   // Набор последовательно подобранных игрой цветов
var level = 0;                                          // Уровень будет повышаться с каждой итерацией nextSequence()
var gameOver = false;                                   // Идентификатор того, что игра проиграна (в ней выиграть НЕЛЬЗЯ! 😈)
let gameIsBegan = false;

function nextSequence() {
    var randNum = Math.floor(Math.random() * 4);    // Случайное число
    var randChosenColor = btnColors[randNum];       // Случайно выбранный цвет
    var userClickedPattern = [];                    // Набор последовательно нажатых юзером кнопок

    gamePattern.push(randChosenColor);

    // Эффект, срабатываемый на кнопке, выбранной случайно самой игрой
    $("#" + randChosenColor).fadeOut(100).fadeIn(100);
    playSound(randChosenColor);

    // Ключевой код после нажатия юзером цветной кнопки
    for(var i = 0; i < gamePattern.length; i++) {
        $(".btn").on("click", function() {
            var userChosenColor = $(this).attr("id");
            userClickedPattern.push(userChosenColor);

            if(userClickedPattern[i] !== gamePattern[i]) {
                console.log("wrong");
                gameOver = true;
                playSound("wrong");
            } else {
                console.log("success");
                playSound(userChosenColor);
            }
            animatePress(userChosenColor, gameOver);
        });
    }

    // Проверка на то, что порядок кнопок, выбранный игроком, совпадает с предоставленным игрой
    /* if(userClickedPattern.length === gamePattern.length) {
        for(var i = 0; i < gamePattern.length; i++) {
            if(userClickedPattern[i] !== gamePattern[i]) {
                gameOver = true;
            }
        }
    } */

    level++;                        // Повышаем ставки! (В конце функции)
    $("h1").text("Level " + level)  // ...и обновляем заголовок
};

// Отыгрыш звука цветной кнопки
function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
};

// Мгновенное добавление серой кнопки на 100 мсек
function animatePress(currentColor) {
    var idBtn = "#" + currentColor;
    var effect = "pressed";
    
    $(idBtn).addClass(effect);
    setTimeout(() => {
        $(idBtn).removeClass(effect);
    }, 100);
}

// Первая итерация игры
if(gameIsBegan === false) {
    $(document).on("keydown", (event) => {
        if(event.key === "a") {
            gameIsBegan = true;
            $("h1").text("Level " + level);
            nextSequence();
        }
    })
}

/* while(!gameOver) {
    nextSequence();
} */