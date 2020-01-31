import generateRandomSet from './generateRandomSet.js';
export default function gameStateProto(result){
    const questions = result.questions;
    return  {
        roundCounter: 0,
        endRoundState: false,
        earnedMoney: 0,
        helperOptions: 3,
        questions: questions,
        cash: result.cashArr,
        oldQuestionsSet: localStorage.getItem('oldQuestionsSet'), // load number of questions set
        questionsSet: generateRandomSet(this.oldQuestionsSet,questions)
    }
};