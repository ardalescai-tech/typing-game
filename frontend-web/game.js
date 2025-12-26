let selectedText = "";
let startTime = 0;
let timerInterval = null;

const textBox = document.getElementById("text-to-type");
const input = document.getElementById("typing-input");

const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accEl = document.getElementById("accuracy");

const startBtn = document.getElementById("start-btn");
const submitBtn = document.getElementById("submit-btn");

startBtn.addEventListener("click", startGame);

async function loadText() {
  const res = await fetch("assets/words.json");
  const data = await res.json();

  selectedText = data.texts[Math.floor(Math.random() * data.texts.length)];
  textBox.innerText = selectedText;
}

function startGame() {
  loadText();

  input.value = "";
  input.disabled = false;
  input.focus();

  startTime = Date.now();
  submitBtn.disabled = true;

  let seconds = 0;
  timerInterval = setInterval(() => {
    seconds++;
    timeEl.innerText = seconds;
  }, 1000);

  input.addEventListener("input", checkProgress);
}

function checkProgress() {
  const typed = input.value;

  if (typed === selectedText) finishGame();
}

function finishGame() {
  clearInterval(timerInterval);
  input.disabled = true;

  const timeTaken = parseInt(timeEl.innerText);
  const words = selectedText.split(" ").length;

  const wpm = Math.round(words / (timeTaken / 60));
  const accuracy = 100;

  wpmEl.innerText = wpm;
  accEl.innerText = accuracy + "%";

  submitBtn.disabled = false;
}
