export default function setChance(playerChance,percentageValues,currentGameState,answers) {
    const chance = Math.round(Math.random() *99 +1);
    const correctAnswer = currentGameState.questions[currentGameState.questionsSet][currentGameState.roundCounter].correct;
    const largest = Math.max.apply(Math, percentageValues); 
    const placeLargest = percentageValues.indexOf(largest);
    let correctPos;

    function move(percentageValues ,from, to) {
        percentageValues.splice(to, 0, percentageValues.splice(from, 1)[0]);

        return percentageValues;
    };
     
    for(let i in answers) {
        if(answers[i] == correctAnswer && chance <= playerChance)
            correctPos = i;
    }
    
    percentageValues = move(percentageValues,placeLargest,correctPos);
   
    return percentageValues;
}