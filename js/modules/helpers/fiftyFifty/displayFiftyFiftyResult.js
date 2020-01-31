export default function displayFiftyFiftyResult(gameAnswersContainers,randNumb,elementToDelete,currentGameState) {
    const correctAnswer = currentGameState.questions[currentGameState.questionsSet][currentGameState.roundCounter].correct;
    const answers = currentGameState.questions[currentGameState.questionsSet][currentGameState.roundCounter].answer;
    
    for(let k=0;k<=3;k++) {  
        if(answers[k] != correctAnswer){ 
            elementToDelete.push(answers[k]);
        }

        for(let i=0;i<=1;i++) {
            if(elementToDelete[i] === answers[k])
                answers.splice(k,1);
            if(elementToDelete[i] === $(gameAnswersContainers[k]).text()) {
                $(gameAnswersContainers[k]).text("");
            }
        }
    }
    elementToDelete.splice(randNumb,1);
}