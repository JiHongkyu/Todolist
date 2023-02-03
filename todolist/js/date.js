const fullDate = document.querySelector('.day h1');
const week = document.querySelector('.day h2');

function getDate() {
    const newDate = new Date();
    const year = String(newDate.getFullYear()).padStart(4, '0');
    const month = String(newDate.getMonth()+1).padStart(2, '0');
    const date = String(newDate.getDate()).padStart(2, '0');
    const days = newDate.getDay();
    const arrDays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

    fullDate.innerText = `${year}년 ${month}월 ${date}일`;
    week.innerText = arrDays[days];
}

getDate();