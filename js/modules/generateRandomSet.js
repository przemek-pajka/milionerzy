 export default function generateRandomSet(oldQuestionsSet,questions) {
        const questionsSet = Math.round(Math.random() * (questions.length - 1));
        
        if(questionsSet == oldQuestionsSet)   // If the question set number was used in the previous game, generate new number
            generateRandomSet(oldQuestionsSet);
                  
        localStorage.setItem('oldQuestionsSet',questionsSet);
        return questionsSet;       
    }