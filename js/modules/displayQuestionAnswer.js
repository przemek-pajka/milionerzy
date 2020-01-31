export default function displayQuestionAnswers(currentGameState) {
    let gameAnswersContainers = $('.game-wrapper__answers__item');
    const answers = currentGameState.questions[currentGameState.questionsSet][currentGameState.roundCounter].answer;

    for(let k in [...gameAnswersContainers]) {
        $(gameAnswersContainers[k]).text(answers[k]);
    }
}