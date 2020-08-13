// función para obtener la hora de una fecha en formato timestamp
const getHours = (start, end) => {
    const startHour = new Date(start);
    const startTime = startHour.getHours();
    const endHour = new Date(end);
    const endTime = endHour.getHours();
    return [startTime, endTime];
}

module.exports = { getHours }

