import displayFiftyFiftyResult from './displayFiftyFiftyResult.js';
export default function fiftyFifty(currentGameState) { 
       const gameAnswersContainers = $('.game-wrapper__answers__item');
       const randNumb = Math.round(Math.random()*2);
       let elementToDelete = [];

       displayFiftyFiftyResult(gameAnswersContainers,randNumb,elementToDelete,currentGameState);
    }