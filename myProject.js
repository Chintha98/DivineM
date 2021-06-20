$(document).ready(function () {

    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html').animate({
                scrollTop: $(hash).offset().top
            }, 1000, function () {
                window.location.hash = hash;
            });
        }
    });
});




$("video").prop('muted', true);
$("#sound-on").css("display", "none")

$(".mute-video").click(function () {
    if ($("video").prop('muted')) {
        $("video").prop('muted', false);
        $("#sound-off").css("display", "none")
        $("#sound-on").css("display", "inline")

    } else {
        $("video").prop('muted', true);
        $("#sound-on").css("display", "none")
        $("#sound-off").css("display", "inline")
    }
});

for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        var buttonHtml = this.innerHTML;

        makeSound(buttonHtml);

        buttonAnimation(buttonHtml);
    });


}


document.addEventListener("keypress", function (event) {
    makeSound(event.key);

    buttonAnimation(event.key);
});



function makeSound(key) {
    switch (key) {
        case ("w"):
            var tom4 = new Audio('./sounds/tom-4.mp3');
            tom4.play();
            break;

        case ("a"):
            var tom3 = new Audio("./sounds/tom-3.mp3")
            tom3.play();
            break;

        case ("s"):
            var tom2 = new Audio("./sounds/tom-2.mp3")
            tom2.play();
            break;

        case ("d"):
            var tom1 = new Audio("./sounds/tom-1.mp3")
            tom1.play();
            break;

        case ("j"):
            var snare = new Audio("./sounds/snare.mp3")
            snare.play();
            break;

        case ("k"):
            var kick = new Audio("./sounds/kick-bass.mp3");
            kick.play();
            break;

        case ("l"):
            var crash = new Audio("./sounds/crash.mp3");
            crash.play();
            break;

        default:
            console.log(buttonHtml);

    }
}

function buttonAnimation(currentKey) {
    var activeBtn = document.querySelector("." + currentKey);
    activeBtn.classList.add("pressed");

    setTimeout(function () {
        activeBtn.classList.remove("pressed");
    }, 100);
}


var btnNum = ["btn1", "btn2", "btn3", "btn4", "btn5", "btn6", "btn7"];

var earPattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


$("#earTitle").click(function () {

    if (!started) {

        nextSequence();
        started = true;
    }
});



$(".earBtn").click(function () {

    var userChosenbtn = $(this).attr("id");

    userClickedPattern.push(userChosenbtn);
    $("#" + userChosenbtn).addClass("pressed").delay(100).queue(function () {
        $(this).removeClass("pressed").dequeue();
    });

    var audio = new Audio("./sounds/Notes/" + userChosenbtn + ".mp3");
    audio.play();

    checkAnswer(userClickedPattern.length - 1);

});



function checkAnswer(currentlevel) {

    if (earPattern[currentlevel] === userClickedPattern[currentlevel]) {

        if (earPattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 2000);

        }
    } else {
        var wrong = new Audio("./sounds/Notes/fail-buzzer-01.mp3")
        wrong.play();
        $("body").addClass("try-again");
        $("#earTitle").text("Try again");
        startOver(wrong);
    }
}



function startOver() {
    started = false;

    userClickedPattern = [];
    earPattern = [];
    level = 0;

}

function nextSequence() {

    userClickedPattern = [];

    level++;

    $("body").removeClass("try-again");

    $("#earTitle").text("Play")
    var randomNumber = Math.floor(Math.random() * 7);
    var randomColorChoosen = btnNum[randomNumber];
    earPattern = [];
    earPattern.push(randomColorChoosen);


    var audio = new Audio("./sounds/Notes/" + randomColorChoosen + ".mp3");
    audio.play();

}

$('#listenAgain').click(function () {
    var note = earPattern[0];
    var audio = new Audio("./sounds/Notes/" + note + ".mp3");
    audio.play();
})

