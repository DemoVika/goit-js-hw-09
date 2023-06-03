import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
let selectedDate = null;

startBtn.disabled = true;
startBtn.addEventListener('click', onStartClick);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function onStartClick() {
  startBtn.disabled = true;
  timerId = setInterval(() => {
    let currentDate = new Date();
    const ms = selectedDate - currentDate;
    const objectDate = convertMs(ms);

    dataDays.textContent = addLeadingZero(objectDate.days);
    dataHours.textContent = addLeadingZero(objectDate.hours);
    dataMinutes.textContent = addLeadingZero(objectDate.minutes);
    dataSeconds.textContent = addLeadingZero(objectDate.seconds);
  }, 1000);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0]; //чтобы было видно глобально
    if (selectedDates[0] <= Date.now()) {
      alert('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
