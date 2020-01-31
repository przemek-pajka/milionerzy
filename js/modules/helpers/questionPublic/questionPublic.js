import generateChartBlocks from './generateChartBlocks.js';
import animateChart from './animateChart.js';
export default function questionPublic(currentGameState) { 
        const percentageContainer = `<div class="game-wrapper__percentage"></div>`;
        const answers = currentGameState.questions[currentGameState.questionsSet][currentGameState.roundCounter].answer;
        $('.game-wrapper__helpers').append(percentageContainer);
 
        let percentageValues = generateChartBlocks(100,answers.length);
        animateChart(percentageValues,currentGameState,answers);
     }