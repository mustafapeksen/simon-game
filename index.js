var buttonColor = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];



var gameStarted = false;

var level = 0;

$(document).keydown(function () {
    if (!gameStarted) {
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
})




$(".btn").click(function () {
    animatePress();
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSounds(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColor[randomNumber];
    gamePattern.push(randomChosenColour);
    var selectColour = $("#" + randomChosenColour);
    selectColour.fadeOut(100).fadeIn(100);
    playSounds(randomChosenColour);
    level++;
    $("h1").text("Level " + level)
    userClickedPattern = [];
}

function playSounds(name) {
    var soundsPath = "./sounds/" + name + ".mp3";
    var colourAudio = new Audio(soundsPath);
    colourAudio.play();
}


function animatePress() {
    $(".btn").click(function () {
        $(this).addClass('pressed');
        setTimeout(() => {
            $(this).removeClass('pressed');
        }, 100);
    });
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }
                , 1000
            );
        }

        console.log("succes");
    }
    else {
        var gameOverSound = new Audio("./sounds/wrong.mp3/")
        gameOverSound.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false
}