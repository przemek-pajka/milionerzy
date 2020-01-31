import gameSounds from './gameSounds.js';
import showResults from './showResults.js';
import validatePlayerAnswer from './validatePlayerAnswer.js';
import prepareGameBoard from './prepareGameBoard.js';
export default function selectAnswer(currentGameState) {
    $('.game-wrapper__answers__item').click(function() {
        const selectedResponseCell = $(this);
        const selectedAnswer = $(this).text();
        gameSounds.checkAnswer.play();
        prepareGameBoard.afterChoosingAnswer(selectedResponseCell);

        setTimeout(function() {
            const result = validatePlayerAnswer(selectedAnswer,selectedResponseCell,currentGameState);
            showResults(result);
        },3000)

    });
    return false;
}