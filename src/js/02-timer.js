import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.getElementById('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const valueOfDays = document.querySelector('[data-days]');
const valueOfHours = document.querySelector('[data-hours]');
const valueOfMinutes = document.querySelector('[data-minutes]');
const valueOfSeconds = document.querySelector('[data-seconds]');
/* const timer = document.querySelector('.timer'); */

btnStart.disabled = true;
btnStart.addEventListener('click', count);
let targetTime = null;
let timeInterval = null;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0] < new Date()){
            Notiflix.Notify.warning("Please choose a date in the future")
        } 
      console.log(selectedDates[0]);
      if(selectedDates[0] > new Date()){
        targetTime = selectedDates[0];
        btnStart.disabled = false; 
    }  
},
  };

flatpickr('#datetime-picker', options);

function count() {
   timeInterval = setInterval(counter, 1000);
   btnStart.disabled = true;
}

function counter() {
    let deltaTime = targetTime - new Date();
    const time = convertMs(deltaTime);

    if (deltaTime <= 0) {
        Notiflix.Notify.success('Время вышло');
        clearInterval(timeInterval);
        return
    }
    updateValueTime(time);
}

function updateValueTime({ days, hours, minutes, seconds}) {
    valueOfDays.textContent = `${days}`;
    valueOfHours.textContent = `${hours}`;
    valueOfMinutes.textContent = `${minutes}`;
    valueOfSeconds.textContent = `${seconds}`;
 /*    timer.textContent = `${days}d:${hours}:${minutes}:${seconds}`; */
}

function addLeadingZero(value){
    return String(value).padStart(2,'0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  

  