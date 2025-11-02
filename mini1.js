const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

// Load saved state from SessionStorage
if (sessionStorage.getItem("startTime")) {
  startTime = parseInt(sessionStorage.getItem("startTime"));
  elapsedTime = parseInt(sessionStorage.getItem("elapsedTime"));
  const running = sessionStorage.getItem("running") === "true";

  if (running) {
    const currentTime = Date.now();
    elapsedTime += currentTime - startTime;
    startTime = currentTime - elapsedTime;
    startTimer();
  } else {
    updateDisplay(elapsedTime);
  }
}

function updateDisplay(time) {
  const totalSeconds = Math.floor(time / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  display.textContent = `${hours}:${minutes}:${seconds}`;
}

function startTimer() {
  if (timerInterval) return;

  sessionStorage.setItem("running", "true");

  // Save start time
  if (!startTime) {
    startTime = Date.now() - elapsedTime;
  }

  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay(elapsedTime);
    sessionStorage.setItem("elapsedTime", elapsedTime);
  }, 1000);

  sessionStorage.setItem("startTime", startTime);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  sessionStorage.setItem("running", "false");
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  startTime = 0;
  updateDisplay(0);
  sessionStorage.clear();
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
