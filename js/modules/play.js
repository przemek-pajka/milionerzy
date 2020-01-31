import prepareQuestions from './prepareQuestions.js';
import startGame from './startGame.js';
export default function play() {
   localStorage.setItem('playerNick',$('#nick-input').val());
   prepareQuestions().then((data) => {
      startGame(data)
   });
 }