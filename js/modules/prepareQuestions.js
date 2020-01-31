const prepareQuestions = async() => {
    let cashArr; 
    let questions;
    const getData = (data) => {
        cashArr = data.cash;
        questions = data.question_sets;
    }
    await $.getJSON("./questions-answers.json",function(result) {
        getData(result);
    });  
    return {cashArr,questions}
};

export default prepareQuestions;
    