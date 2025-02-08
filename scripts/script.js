let timerDisplay = document.getElementById('timer');
let startButton = document.getElementById('start');
let pauseButton = document.getElementById('pause');
let resetButton = document.getElementById('reset');
let cycleCounter = document.getElementById('cycle-counter');
let stateTitle = document.getElementById('state-title');
let container = document.getElementById('container');

const workTime = 25*60;
const breakTime = 5*60;

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

// add the state title with respective animation
function stateTitleAnimation(state) {

    stateTitle.classList.add('fade');
    setTimeout(() => {
        stateTitle.textContent = state;
    }, 500);
    setTimeout(() => {
        stateTitle.classList.remove('fade');
    }, 1500);
}

function breakTimeStyle(){
    container.classList.toggle("box-style-green");
}

function switchPhase() {
    if (isBreak) {
        cycles++;
        cycleCounter.textContent = `${cycles}/4`;

        stateTitleAnimation("Focus");
        breakTimeStyle();

        if (cycles < 4) {
            isBreak = false;
            timeLeft = workTime;
        } else {
            updateTimer(0);
            stateTitleAnimation("Ended");
            container.classList.remove("box-style-green");
            startButton.classList.remove('hide');
            pauseButton.classList.add('hide');
            return
        }
    } else {
        breakTimeStyle();
        isBreak = true;
        stateTitleAnimation("Break");
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
    breakTimeStyle();
    stateTitleAnimation("Focus");
    clearInterval(timer);
    isRunning = false;
    timeLeft = workTime;
    isBreak = false;
    cycles = 0;
    updateTimer(timeLeft);
    cycleCounter.textContent = `${cycles}/4`;
}

startButton.addEventListener('click', () => {
    startButton.classList.add('hide');
    pauseButton.classList.remove('hide');
    startTimer();
});

pauseButton.addEventListener('click', () => {
    pauseButton.classList.add('hide');
    startButton.classList.remove('hide');
    pauseTimer();
});
resetButton.addEventListener('click', resetTimer);