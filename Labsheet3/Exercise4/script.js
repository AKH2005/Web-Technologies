// ARRAY TO STORE ACTIVITY LOG
let activityLog = [];

let logBox = document.getElementById("logBox");
let warning = document.getElementById("warning");

// Threshold for suspicious activity
const CLICK_LIMIT = 12;
let clickCount = 0;

// ----------------------------
// EVENT LISTENERS
// ----------------------------

// Click (capturing phase)
document.addEventListener("click", logClick, true);

// Key press
document.addEventListener("keyup", logKeyPress);

// Focus in + out
document.addEventListener("focusin", logFocusIn);
document.addEventListener("focusout", logFocusOut);

// ----------------------------
// LOGGING FUNCTIONS
// ----------------------------

function logClick(event) {
  clickCount++;

  let entry = {
    type: "Click",
    detail: `Clicked: ${event.target.tagName}`,
    time: new Date().toLocaleTimeString()
  };

  activityLog.push(entry);
  updateLogDisplay();

  if (clickCount > CLICK_LIMIT) {
    warning.textContent = "⚠ Suspicious activity: Excessive clicking detected!";
  }
}

function logKeyPress(event) {
  let entry = {
    type: "Key Press",
    detail: `Key: ${event.key}`,
    time: new Date().toLocaleTimeString()
  };

  activityLog.push(entry);
  updateLogDisplay();
}

function logFocusIn(event) {
  let entry = {
    type: "Focus In",
    detail: `Focused on: ${event.target.tagName}`,
    time: new Date().toLocaleTimeString()
  };

  activityLog.push(entry);
  updateLogDisplay();
}

function logFocusOut(event) {
  let entry = {
    type: "Focus Out",
    detail: `Blur from: ${event.target.tagName}`,
    time: new Date().toLocaleTimeString()
  };

  activityLog.push(entry);
  updateLogDisplay();
}

// ----------------------------
// DISPLAY LOG
// ----------------------------
function updateLogDisplay() {
  logBox.innerHTML = "";

  activityLog.forEach(item => {
    let div = document.createElement("div");
    div.classList.add("log-entry");
    div.textContent = `${item.time} — ${item.type} (${item.detail})`;
    logBox.appendChild(div);
  });
}

// ----------------------------
// RESET BUTTON
// ----------------------------
document.getElementById("resetBtn").addEventListener("click", () => {
  activityLog = [];
  clickCount = 0;
  warning.textContent = "";
  updateLogDisplay();
});

// ----------------------------
// EXPORT BUTTON
// ----------------------------
document.getElementById("exportBtn").addEventListener("click", () => {
  let formattedLog = activityLog
    .map(item => `${item.time} — ${item.type}: ${item.detail}`)
    .join("\n");

  let blob = new Blob([formattedLog], { type: "text/plain" });
  let url = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = url;
  a.download = "activity_log.txt";
  a.click();
});
