const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
let level = 0;

//start the game with any key
$(document).keypress(function() {

  if (level === 0) {
    $("#level-title").text("Level 0");
    nextSequence();
  }

});

function nextSequence() {

  level++;
  console.log(level);
  userClickedPattern.length = 0;
  $("#level-title").text("Level " + level);

  //generate a random colour and add to the array
  let randomNum = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNum];
  gamePattern.push(randomChosenColour);

  //use jQuery to select the button and play a sound
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  
  playSound(randomChosenColour);

}

//user sequence
$(".btn").on("click", function() {

  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});

function playSound(name) {

  let sound = new Audio("sounds/" + name + ".mp3");
  sound.play();

}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel) {

  if(gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {

    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();

  } 

  //user has finished the current sequence, proceed
  if(gamePattern.length === userClickedPattern.length) {

    setTimeout(function () {
      nextSequence();
    }, 1000);

  }
}

//start the game over when the user gets an answer wrong
function startOver() {

  level = 0;
  gamePattern.length = 0;

}