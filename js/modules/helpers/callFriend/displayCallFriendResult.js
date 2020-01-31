import generateRandomNumb from './generateRandomNumb.js'
export default function displayCallFriendResult(chance,phoneFriendWrapper,currentGameState) {
    const correctAnswer = currentGameState.questions[currentGameState.questionsSet][currentGameState.roundCounter].correct;
    const answers = currentGameState.questions[currentGameState.questionsSet][currentGameState.roundCounter].answer;   
    if (chance <= 70) {
        $(phoneFriendWrapper).append("Myślę, że poprawna odpowiedź to " + correctAnswer);
    }
    if (chance > 70) {
        let rand = generateRandomNumb(currentGameState); // draw numbers to avoid giving the correct answer
        $(phoneFriendWrapper).append("Myślę, że poprawna odpowiedź to " + answers[rand]);
    }
}