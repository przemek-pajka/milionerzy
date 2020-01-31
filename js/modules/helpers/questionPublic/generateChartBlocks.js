export default function generateChartBlocks(max, thecount) { 
    const percentageBlock = `<div class="game-wrapper__percentage-block">
    <div class="game-wrapper__percentage-bar"></div>
    <div class="game-wrapper__percentage-text"></div>
    </div>`;
    let percentageValues = [];
    let currsum = 0;

    for(let i=0; i<thecount; i++) {
        $(".game-wrapper__percentage").append(percentageBlock); 
        percentageValues.push(Math.random());
        currsum += percentageValues[i];
    }
    for(let i in percentageValues) {
        percentageValues[i] = Math.round(percentageValues[i] / currsum * max);
    }

    return percentageValues;
}
 

