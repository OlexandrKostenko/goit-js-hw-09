function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStart.addEventListener('click', onBtnStart);
btnStop.addEventListener('click', onBtnStop);
btnStop.disabled = true;

let intervalId = null;

  function onBtnStart(evt) {
 intervalId = setInterval(() => {document.body.style.backgroundColor = getRandomHexColor()}, 1000);
 btnStart.disabled = true;
 btnStop.disabled = false;
  } 

  function onBtnStop(evt) {
    clearInterval(intervalId);
    btnStart.disabled = false;
    btnStop.disabled = true;
}
