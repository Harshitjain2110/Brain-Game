
//Removing the loading screen and bringing the home-screen after 2 seconds
setTimeout(function(){
    $(".loading-screen").css("display","none");
    $(".home-screen").removeClass("display-none");
},2000);



//To fill the gamePattern array, a random number between 0-3 is generated and depending on that next value for gamepattern array is
//taken from the buttonColours array.
var buttonColours = ["red", "blue", "green", "yellow"];

//To store the pattern or sequence generated by the system
var gamePattern = [];

//To store the pattern / sequence of the user
var userClickedPattern = [];


//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//2. Create a new variable called level and start at level 0.
var level = 0;

//Start game when clicked on start button
function start_game(){
    if (!started) {

        //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
}
//Detect any keypress on the document and start the game if not started
$(document).keypress(start_game);


//Create userPattern array when the colour buttons are clicked , playSound corresponding to the button and animate it
$(".btn").click(function() {


    if(!started){
        $("h1").text("First start the game");
    }
    else{
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);

        //To check whether the button clicked by the user matches the gamePattern
        checkAnswer(userClickedPattern.length-1);

    }
});



var nextSequence = ()=>{

    //Once the nextSequence is triggered, empty the userClickedPattern array for the next Level
    userClickedPattern = [];

    //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;

    //5. Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);


    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}


function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
               nextSequence();
            }, 1000);

        }
    }
    else{
        //Play the wrong sound
        playSound("wrong");

        //Change the body color to red by adding class game-over to the body
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");

        //Restore to the old body color by removing class 
        setTimeout(function() {
           $("body").removeClass("game-over");
        },200);

        startOver();

        $("#start").html("Restart Game");
    }

}

//To reset the variable values when the game is over
function startOver(){
    level=0;
    gamePattern = [];
    started = false;
}

//To play sound when button is either clicked or the next sequence button is to be highlighted
function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


//Function to animate the user clicked button
function animatePress(currentColour) {

	$("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}



function aboutGame(){
    document.querySelector(".main").classList.toggle("display-none")
    document.querySelector(".main").classList.toggle("main-page");
    document.querySelector(".about").classList.toggle("display-inline");
    document.querySelector(".about").classList.toggle("about-game");

    if(document.querySelector(".main").classList[1]=="display-none")
        $(".navbar button").text("Go back");
    else 
        $(".navbar button").text("How to play?");
}

function exit(){
 setTimeout("window.close()", 500);
}