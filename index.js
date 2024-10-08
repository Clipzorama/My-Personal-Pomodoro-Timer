// Select elements from DOM
const pomodoroBtn = document.getElementById('pomodoro-btn');
const shortBreakBtn = document.getElementById('sb-btn');
const longBreakBtn = document.getElementById('lb-btn');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const timeDisplay = document.getElementById('time');
const timerDiv = document.getElementById('timer');

let currentMode = 'pomodoro';  // Default mode is Pomodoro
let isRunning = false;
let timer;  // Store interval function
let timeLeft = 1500;  // Default to 25 minutes (1500 seconds)

// Mode times in seconds
const times = {
    pomodoro: 1500, // 25 minutes
    shortBreak: 300, // 5 minutes
    longBreak: 900 // 15 minutes
};

// Update the timer display
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Switch between modes
function switchMode(mode) {
    currentMode = mode;
    timeLeft = times[mode];
    updateDisplay();
    
    // Resetting the styles of the timerDiv depending on the mode!
    if (mode === 'pomodoro') {
        timerDiv.style.boxShadow = '0px 0px 30px 10px rgba(255, 2, 2, 0.425)';
        timerDiv.style.border = '3px solid rgba(255, 2, 2, 0.425)';
        pomodoroBtn.classList.add("active");
        shortBreakBtn.classList.remove("active");
        longBreakBtn.classList.remove("active");

    } else if (mode === 'shortBreak') {
        timerDiv.style.boxShadow = '0px 0px 30px 10px rgba(18, 123, 28, 0.76)';
        timerDiv.style.border = '3px solid rgba(18, 123, 28, 0.76)';
        shortBreakBtn.classList.add("active");
        pomodoroBtn.classList.remove("active");
        longBreakBtn.classList.remove("active");
    } else if (mode === 'longBreak') {
        timerDiv.style.boxShadow = '0px 0px 30px 10px rgba(56, 56, 189, 0.76)';
        timerDiv.style.border = '3px solid rgba(56, 56, 189, 0.76)';
        longBreakBtn.classList.add("active");
        pomodoroBtn.classList.remove("active");
        shortBreakBtn.classList.remove("active");
    }
    
    
    // Stop the timer if running and reset the button to 'Start'
    clearInterval(timer);
    isRunning = false;
    startBtn.textContent = 'Start';
}

// function for starting and pausing the timer
function toggleTimer() {
    if (isRunning) {
        clearInterval(timer);
        startBtn.textContent = 'Start';
        isRunning = false;
    } else {
        startBtn.textContent = 'Pause';
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                startBtn.textContent = 'Start';
                isRunning = false;
            }
        }, 1000);
        isRunning = true;
    }
}

// depending on the mode, the button will reset the timer
function resetTimer() {
    clearInterval(timer);
    timeLeft = times[currentMode];
    updateDisplay();
    startBtn.textContent = 'Start';
    isRunning = false;
}

// For the mode buttons
pomodoroBtn.addEventListener('click', () => switchMode('pomodoro'));
shortBreakBtn.addEventListener('click', () => switchMode('shortBreak'));
longBreakBtn.addEventListener('click', () => switchMode('longBreak'));

// implementing the event listeners for both start and reset button
startBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);

// Initializing the original display
updateDisplay();
