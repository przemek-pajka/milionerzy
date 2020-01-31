import gameStateProto from './gameStateProto.js';
import startNewRound from './startNewRound.js';
import prepareGameBoard from './prepareGameBoard.js';
export default function startGame(data) {
    let currentGameState = new gameStateProto(data);
    prepareGameBoard.atStart(currentGameState);
    startNewRound(currentGameState);
}