let timers = [];

document.getElementById('startTimer').addEventListener('click', () => {
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;

  const totalTimeInSeconds = hours*3600+ minutes*60+seconds;

  // Check if the input is valid
  if (totalTimeInSeconds<=0) {
    alert('Please enter a valid time greater than zero.');
    return;
  }
  createTimer(totalTimeInSeconds);
});

function createTimer(duration) {
  const timerId = Date.now(); 
  let remainingTime = duration;

  // Create a new timer element
  
  const timerElement = document.createElement('div');
  timerElement.className = 'timer-item';
  timerElement.id = `timer-${timerId}`;
  timerElement.innerHTML = `
    <span>${formatTime(remainingTime)}</span>
    <button onclick="stopTimer(${timerId})">Delete</button>
  `;

  document.getElementById('activeTimers').appendChild(timerElement);

  // Start the countdown

  const interval = setInterval(() => {
    remainingTime--;
    updateTimerDisplay(timerId, remainingTime);

    if (remainingTime<=0) {
      clearInterval(interval);
      handleTimerEnd(timerId);
    }
  }, 1000);

  timers.push({timerId, interval });
}

function updateTimerDisplay(timerId, time) {
  const timerElement = document.getElementById(`timer-${timerId}`);
  if (timerElement) {
    timerElement.querySelector('span').textContent = formatTime(time);
  }
}

function stopTimer(timerId) {
  const timerIndex = timers.findIndex(t=>t.timerId == timerId);
  if (timerIndex != -1) {
    clearInterval(timers[timerIndex].interval);
    document.getElementById(`timer-${timerId}`).remove();
    timers.splice(timerIndex, 1);
  }
}

function handleTimerEnd(timerId) {
  const timerElement = document.getElementById(`timer-${timerId}`);
  if (timerElement) {
    timerElement.classList.add('timer-ended');
    timerElement.querySelector('span').textContent = 'Timer Is Up !';
    timerElement.querySelector('button').remove();
    playAlarm();
  }
}

function formatTime(seconds) {
  const hrs = Math.floor(seconds/3600).toString().padStart(2, '0');
  const mins = Math.floor((seconds%3600)/60).toString().padStart(2, '0');
  const secs = (seconds%60).toString().padStart(2, '0');
  return `${hrs} : ${mins} : ${secs}`;
}

// Alarm //
// function playAlarm() {
//   const alarmSound = new Audio('#');
//   alarmSound.play();
// }




// Current Time //

// function showTime() {
// 	document.getElementById('current-timers-btn').innerHTML = new Date().toUTCString();
// }
// showTime();
// setInterval(function () {
// 	showTime();
// }, 1000);
