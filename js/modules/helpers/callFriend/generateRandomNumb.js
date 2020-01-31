//draw numbers to avoid giving the correct answer
export default function generateRandomNumb(currentGameState) {
    const correctAnswer = currentGameState.questions[currentGameState.questionsSet][currentGameState.roundCounter].correct;
    const answers = currentGameState.questions[currentGameState.questionsSet][currentGameState.roundCounter].answer;   
    let rand = Math.round(Math.random() *(answers.length-1)); 

    if(answers[rand] == correctAnswer)
        rand = generateRandomNumb(currentGameState);
           
    return rand;
}