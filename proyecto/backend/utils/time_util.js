// función para obtener la hora de una fecha en formato timestamp
const getHour = timeStamp => {
    const time = parseInt(timeStamp);
    const newTime = new Date(time * 1000);
    const hour = newTime.getHours();
    return hour;
}

module.exports = { getHour }

