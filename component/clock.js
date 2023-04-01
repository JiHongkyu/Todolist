const date = new Date();
const dateYear = document.querySelector(".date-year");
const dateMonth = document.querySelector(".date-month");
const dateDay = document.querySelector(".date-day");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];


dateYear.innerText = date.getFullYear();
dateMonth.innerText = months[date.getMonth()];
dateDay.innerText = date.getDate();

const clock = document.querySelector(".clock");

currentClock();
setInterval(() => {
  currentClock();
}, 1000);

function currentClock() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  let moment = "";

  hours >= 12 ? moment = "PM" : moment = "AM";

  clock.innerText = `${moment} ${hours}:${minutes}`;
}