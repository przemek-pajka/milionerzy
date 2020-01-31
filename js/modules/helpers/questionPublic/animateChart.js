import setChance from './setChance.js';
export default function animateChart(percentageValues,currentGameState,answers) {
    const percentageBar = $('.game-wrapper__percentage-bar');
    const percentageText = $('.game-wrapper__percentage-text');

    //At first argument, how many percent has audience to choose a correct answer
    percentageValues = setChance(70,percentageValues,currentGameState,answers);
 
    for(let i in [...percentageBar]) {
        $(percentageBar[i]).animate({height:percentageValues[i]+"%"},700);
        $(percentageBar[i]).text(percentageValues[i]);
        $(percentageText[i]).text(answers[i]);       
    }
}