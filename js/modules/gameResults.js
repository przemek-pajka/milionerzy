import startNewRound from './startNewRound.js'
import gameSounds from './gameSounds.js';
import messages from './messages.js';
import replayBtn from './replayBtn.js';
 export default function gameResults(currentGameState) {
    const replayBtnComponent = replayBtn.init();
    const gameWrapperInfo = $('.game-wrapper__info');
    return {
        getNextRound() {
            gameSounds.correctAnswer.play();
            $(gameWrapperInfo).text(messages.nextRound);
            currentGameState.roundCounter += 1 ;
            currentGameState.earnedMoney = currentGameState.cash[currentGameState.roundCounter];
            setTimeout(function() {startNewRound(currentGameState)},2200);
        },
        looseGame() {
            gameSounds.looseGame.play();
            $(gameWrapperInfo).text(messages.looseGame + currentGameState.questions[currentGameState.questionsSet][currentGameState.roundCounter].correct);
            $(gameWrapperInfo).append(replayBtnComponent);
        },
        winGame(){
            gameSounds.winGame.play();
            $(gameWrapperInfo).html(messages.winGame);
            $(gameWrapperInfo).append(replayBtnComponent);
        }
    }
 }
 
 