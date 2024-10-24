//          Basis jQuery methods


/* $("h1").css("display", "flex");
$("h1").css("justify-content", "center"); */

/* $("h1").css("border", "black solid 5px");
$("h1").css("color", "indigo");
console.log($("h1").css("color"));

$("h1").addClass("big-title margin-100");
//$("div").removeClass("add-grid"); 
alert($("div").hasClass("add-grid")); */


//          jQuery text and attributes manipulations


/* $("h1").text("By-y-ye, Guys!");

// Output html-content inside current tag
$("button").html("<em>Hey Vsauce, Michael here</em>");

// Adding or resetting <img> attributes
$("img").attr("src", "./Assets/garden.jpg");
$("img").attr("alt", "beautiful garden"); */


//                     Event Listeners

/* $("button").eq(0).click(function() {
    $("img").attr("src", "./Assets/garden.jpg");
    $("img").attr("alt", "beautiful garden");
}); */

// Method "on" for EventListener is more universal.
/* $("button").eq(0).on("click", function() {
    $("img").attr("src", "./Assets/garden.jpg");
    $("img").attr("alt", "beautiful garden");
});

$("button").eq(1).click(function() {
    $("img").attr("src", "./Assets/office.jpg");
    $("img").attr("alt", "officable office");
});

$(document).keydown(function(event) {
    switch(event.key) {
        case "1":
            $("img").attr("height", "100");
            break;
        case "2":
            $("img").attr("height", "200");
            break;
        case "3":
            $("img").attr("height", "300");
            break;
        case "4":
            $("img").attr("height", "400");
            break;
        case "5":
            $("img").attr("height", "500");
            break;
        default:
    }
});

$(document).keydown(function(event) {
    $("h1").text(event.key);
});

$(document).keyup(function(event) {
    $("h2").text(event.key);
}); */


//              Adding and removing html elements


// Method 'before' ('after') adding html-code before (after) current html-element:
// $("h1").before("<button>Run</button>");

// Method 'prepend' ('append') adding html-code INSIDE current html-element in BEGINNING (AT THE END):
// $("h1").prepend("<button>Run</button>");

// Removes all "button" elements
// $("button").remove();


//          jQuery Animations


// Without animation
$("button").eq(0).on("click", function() {
    $("h1").show();
});
$("button").eq(3).on("click", function() {
    $("h1").hide();
});

// With animation
$("button").eq(1).on("click", function() {
    $("h1").fadeIn();
});
$("button").eq(4).on("click", function() {
    $("h1").fadeOut();
});

// Also
$("button").eq(2).on("click", function() {
    $("h1").slideUp();
})
$("button").eq(5).on("click", function() {
    $("h1").slideDown();
});

// Other (optionalise with CSS) animations
// IMPORTANT: "animated" method works only with numeric css-values
$("h1").on("click", function() {
    $("h1").animate(
        // Первый набор параметров указывает на то, что будет анимироваться
        {margin: 50, opacity: 0.5},
        // Второй набор параметров показывает то, как объект будет анимироваться (также см. консоль)
        {duration: 5000,
         complete: function() {
            $("h1").css("border", "black solid 10px");
        },
         step: function(now) {
            console.log("Текущее значение: " + now);
         }});
});

$("button#image-btn").on("click", function() {
    // Очередь анимаций срабатывает через точку
    $("img").slideUp().slideDown().animate({
        margin: "0 25%",
        height: 200
    });
});