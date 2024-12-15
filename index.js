window.addEventListener("DOMContentLoaded", () => {
    const audio = new Audio("./sounds/walk.mp3");
    audio.loop = true;

    // Play audio on first user interaction
    document.body.addEventListener("keydown", () => {
        audio.play().then(() => {
            console.log("Audio is playing!");
        }).catch(error => {
            console.error("Audio playback failed:", error);
        });
    }, { once: true });
});

var buttonCol = ["bear", "dog", "tiger", "deer"];
var gamePattern = [];
var userClickedPattern = [];
var start = false; // Flag to check if the game has started
var level = 0;

// Trigger the start of the game on the first click
$(document).keydown(function () {
    if (!start) {
        $("h1").text("Level " + level);
        nextSequence(); // Start the first sequence when clicked
        start = true; // Set the flag to true so the game doesn't start again
    }
});

// Function to handle card flip
function clickFlip(userChosenCol) {
    // Target the specific flip-card-inner of the clicked card and add the 'hover' class
    $("#" + userChosenCol).addClass("hover");

    // Optionally, remove the hover class after a delay to flip the card back
    setTimeout(() => {
        $("#" + userChosenCol ).removeClass("hover");
    }, 500); // Adjust the time as needed (1000ms = 1 second)
}

// Event listener for card clicks
$(".flip-card").click(function () {
    var userChosenCol = $(this).attr("id");
    userClickedPattern.push(userChosenCol);
    clickFlip(userChosenCol);  // Flip the clicked card
    checkAnswer(userClickedPattern.length - 1);  // Check the user's answer
});

function nextSequence() {
    userClickedPattern = [];
    level++; // Increment the level
    $("h1").text("Level " + level); // Update the level text on the screen

    var randNum = Math.floor(4 * Math.random()); // Generate a random number to choose a card
    var randChosen = buttonCol[randNum]; // Choose a card from buttonCol array
    gamePattern.push(randChosen); // Add the chosen card to the game pattern

    // Only flip the most recent card
    setTimeout(() => {
        clickFlip(randChosen); // Flip the most recent card
    }, 500); // You can adjust the delay as needed
}



function checkAnswer(curLevel) {
    // Check if the user's chosen pattern matches the game pattern
    if(start){
    if (userClickedPattern[curLevel] === gamePattern[curLevel]) {
        console.log("success");
        // If the user has completed the pattern, move to the next sequence
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence(); // Proceed to the next level after a short delay
            }, 1000);
        }
    } else {
        console.log("fail");
        $("h1").text("Game Over"); 
        setTimeout// Display game over message
        startOver(); // Reset the game
    }}
}

function startOver() {
    level = 0; // Reset the level
    gamePattern = []; // Clear the game pattern
    start = false; // Set start to false to restart the game
}
