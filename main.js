// Selectors
const container = document.querySelector(".game-container");
const button = document.getElementById('catchBtn');
const timerDisplay = document.getElementById('timer');
const loseScreen = document.getElementById('loseScreen');
const tryAgainBtn = document.getElementById('tryAgainBtn');  // Fixed typo

let timeLeft = 20;
let timer;
let gameRunning = true;
let interval;
let speed = 1000; // initial speed

// Start the game
function startGame() {
    timeLeft = 20;
    gameRunning = true;
    timerDisplay.textContent = timeLeft;
    loseScreen.style.display = 'none';
    document.querySelector('.game-container').style.display = 'block';  // Make sure game elements are visible

    // Start the countdown
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
        } else {
            clearInterval(timer);
            gameRunning = false;
            showLoseScreen();
        }
    }, 1000);
}

// Show the lose screen
function showLoseScreen() {
    loseScreen.style.display = 'flex';
    document.querySelector('.game-container').style.display = 'none';  // Hide game elements
}

// Button click event for winning condition
button.addEventListener('click', () => {
    if (gameRunning) {
        alert('You got me!');
        clearInterval(timer);
        clearInterval(interval);
        gameRunning = false;
    }
});

// Try again button restarts the game
tryAgainBtn.addEventListener('click', () => {
    document.querySelector('.game-container').style.display = 'block';  // Show game elements
    startGame();  // Restart the game
});

// Functions for moving the button
function moveButton() {
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const randomX = Math.floor(Math.random() * (containerWidth - button.offsetWidth));
    const randomY = Math.floor(Math.random() * (containerHeight - button.offsetHeight));

    button.style.transform = `translate(${randomX}px, ${randomY}px)`;  // Move button to a random position
}

// Event listener to increase speed when hovering
button.addEventListener('mouseover', () => {
    clearInterval(interval);  // Clear previous interval
    speed = 500;  // Increase speed when hovered (reduce time for faster moves)
    startMoving();  // Restart with new speed
});

// Event listener to reset speed after hover
button.addEventListener('mouseout', () => {
    clearInterval(interval);
    speed = 1000;  // Reset to initial speed after hover
    startMoving();
});

// Function to start moving the button at the current speed
function startMoving() {
    interval = setInterval(moveButton, speed);
}

// Start the movement when the page loads
startMoving();
startGame();
