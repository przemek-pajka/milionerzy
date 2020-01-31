import updateName from './updateName.js';
import helpers from './helpers/helpers.js';
export default {
    atStart(currentGameState) {  
        $(document).off('keypress');
        $('.help-btn').prop('disabled',false);
        $('.help-btn').removeClass('help-used');
        $('.start-screen').css('display','none');
        $('.game-wrapper').css('display','block');
        updateName.inGameScreen();
        
        $('.help-btn').off('click').on('click',function(e) { 
            helpers.call(e.currentTarget.id,currentGameState);
            $(this).prop('disabled',true);
            $(this).addClass('help-used');
            
            return false;
        })
    },
    atNewRound(currentGameState){
        const elementsToClear = $(".game-wrapper__info,.game-wrapper__percentage,.game-wrapper__phone-friend");
        
        $('.game-wrapper__answers__item').removeClass('clicked correct incorrect');
        $('.help-btn:not(.help-used)').prop('disabled',false);
        
        [...elementsToClear].forEach(element => {
            $(element).text("");
        });
        
        this.updateGameStats(currentGameState);
    },
    afterChoosingAnswer(selectedResponseCell) {
        $(selectedResponseCell).addClass('clicked');
        $('.game-wrapper__answers__item').off("click");
        $('.help-btn').prop('disabled',true);
    },
    updateGameStats(currentGameState) {
        $('.game-wrapper__question').text(currentGameState.questions[currentGameState.questionsSet][currentGameState.roundCounter].question);
        $('.target-amount__money').text(currentGameState.cash[currentGameState.roundCounter].amount);
        $('.question-number__counter').text(currentGameState.roundCounter + 1);
    },
}