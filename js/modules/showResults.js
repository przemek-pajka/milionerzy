import gameResults from './gameResults.js'
export default function showResult({result,currentGameState}) {  
    switch(result) {
        case 'nextRound': gameResults(currentGameState).getNextRound(); break;
        case 'looseGame': gameResults(currentGameState).looseGame(); break;
        case 'winGame': gameResults(currentGameState).winGame(); break;
    }    
}