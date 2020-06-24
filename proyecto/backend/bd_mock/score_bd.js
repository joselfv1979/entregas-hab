// array de valoraciones de usuarios
let scores = [
    {
        spaceId: 1,
        username: 'Paco12',
        date: '20/06/2020',
        score: '3/5',
        review: 'Nice place'
    },
    {
        spaceId: 0,
        username: 'Paco12',
        date: '20/06/2020',
        score: '3/5',
        review: 'Nice place'
    }

];
// añadido de una nueva valoración
const addScore = (spaceId, data) => {

    const { username, date, score, review} = data;
    scores.push(
        {
            spaceId,
            username,
            date,
            score,
            review
        }
    )

}
// obtención de valoraciones por espacio
const getScores = (spaceId) => {
    return scores.filter(score => score.spaceId === spaceId);
}

module.exports = {
    addScore,
    getScores
}