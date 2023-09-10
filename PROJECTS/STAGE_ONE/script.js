const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function timeUpdate(){
    const currentDate = new Date();
    const currentDay = daysOfWeek[currentDate.getUTCDay()];
    const currentUTCTime = currentDate.getTime();
            
    document.querySelector("[data-testid='currentDayOfTheWeek']").textContent = `${currentDay}`;
    document.querySelector("[data-testid='currentUTCTime']").textContent = `${currentUTCTime} ms`;
}

timeUpdate();
setInterval(timeUpdate, 100);