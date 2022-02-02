var buttonColors = ["red","blue","green","yellow"]
var randomChosenColor;
var empty = [];
var userEmpty = [];
var levelNumber = 0;
var started = false;

function checkAnswer(currentLevel){
    if(userEmpty[currentLevel]===empty[currentLevel]){
        console.log("success");
        if(userEmpty.length===empty.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }

    else{
        console.log("wrong");
        playsound("wrong");
        wrongAnimation();
        $("h1").text("Game Over, Press any key to Restart");
        levelNumber = 0;
        empty = [];
        userEmpty = [];
        started = false;
    }
}

$(document).keydown(function(){
    if(!started){
    $("#level-title").text("Level "+levelNumber);
    nextSequence();
    started = true;
    }
})

$(".btn").click(function(){
    var buttonClicked = $(this).attr("id");
    userEmpty.push(buttonClicked);
    
    playsound(buttonClicked);
    animatePressed(buttonClicked);
    checkAnswer(userEmpty.length-1)
})

function nextSequence(){
    userEmpty = [];
    levelNumber ++;
    $("h1").text("level "+levelNumber);
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColor = buttonColors[randomNumber];
    empty.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColor);
}

function playsound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePressed(currentColor){
    var animateAdded = $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        animateAdded.removeClass("pressed");
    },100)
}

function wrongAnimation(){
    var redAnimate = $("body").addClass("game-over");
    setTimeout(function(){
        redAnimate.removeClass("game-over");
    },100)
}