let timerDisplay = document.getElementById('timer');
let startButton = document.getElementById('start');
let pauseButton = document.getElementById('pause');
let resetButton = document.getElementById('reset');
let cycleCounter = document.getElementById('cycle-counter');

const workTime = 5;
const breakTime = 2;

updateTimer(workTime);

let timeLeft = workTime;
let timer;
let isRunning = false;
let cycles = 0;
let isBreak = false;

function updateTimer(timeLeft) {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function switchPhase() {
    if (isBreak) {
        cycles++;
        cycleCounter.textContent = `${cycles}/4`;
        if (cycles < 4) {
            isBreak = false;
            timeLeft = workTime;
        } else {
            updateTimer(0);
            return 
        }
    } else {
        isBreak = true;
        timeLeft = breakTime;
    }
    updateTimer(timeLeft); 
    startTimer();
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            timeLeft--;
            updateTimer(timeLeft);

            if (timeLeft < 0) {
                clearInterval(timer);
                isRunning = false;
                switchPhase();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = workTime;
    isBreak = false;
    cycles = 0;
    updateTimer(timeLeft);
    cycleCounter.textContent = `${cycles}/4`;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);