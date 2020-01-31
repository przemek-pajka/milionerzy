export default function validatePlayerAnswer(playerAnswer,selectedResponseCell,currentGameState) {
    const correctAnswer = currentGameState.questions[currentGameState.questionsSet][currentGameState.roundCounter].correct;
    const isCorrect = playerAnswer.includes(correctAnswer);

    if(isCorrect && currentGameState.roundCounter == 11) {
        return {result: 'winGame',currentGameState}
    }
    if(isCorrect)  {
        selectedResponseCell.addClass('correct');
        return {result:'nextRound', currentGameState}
    }
    if(!isCorrect)  {
        selectedResponseCell.addClass('incorrect');
        return {result:'looseGame', currentGameState}
    }
    
}