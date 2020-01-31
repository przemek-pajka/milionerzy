import displayQuestionAnswers from './displayQuestionAnswer.js';
import prepareGameBoard from './prepareGameBoard.js';
import selectAnswer from './selectAnswer.js';
export default function startNewRound(currentGameState) { 
    prepareGameBoard.atNewRound(currentGameState);
    displayQuestionAnswers(currentGameState);
    selectAnswer(currentGameState);
}