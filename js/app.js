(function() {

$.getJSON("questions-answers.json",function(result) {
    getData(result);
});


var oldQuestionsSet = localStorage.getItem('oldQuestionsSet'); // load number of old questions set
playerNick = localStorage.getItem('playerNick');
$('#nick-input').val(playerNick);
var cashArr;
var questionsArr;
function getData(data) {
    cashArr = data.cash;
    questionsArr = data.question_sets;
}
/* Finish get Data from JSON files */


var currentGameState;


 function gameStateProt(){
    this.roundCounter = 0;
    this.endRoundState = false;
    this.earnedMoney = 0;
    this.helperOptions = 3;
    this.oldQuestionsSet = localStorage.getItem('oldQuestionsSet'); // load number of questions set
    this.questions_set = generateRandomSet(oldQuestionsSet);
    
    function generateRandomSet(oldQuestionsSet) {
        this.questions_set = Math.round(Math.random() * (questionsArr.length - 1));
        
        if(this.questions_set == oldQuestionsSet)   // If the question set number was used in the previous game, generate new number
            generateRandomSet(oldQuestionsSet);
                  
            localStorage.setItem('oldQuestionsSet',this.questions_set);
            return this.questions_set;       
    }
};
 
$('.help-btn').click(function() {
    $(this).prop('disabled',true);
    $(this).addClass('help-used');
});
$('.fifty-btn').click(function() { 
    helpers.fifty();
});
$('.question-public-btn').click(function() {
    helpers.question_public();
});
$('.phone-friend-btn').click(function() {
    helpers.phone_friend();
});

var helpers = {
    fifty : function() {
        var gameAnswersContainers = $('.game-wrapper__answers__item');
        var randNumb = Math.round(Math.random()*2);
        var elementToDelete = [];
     
        for(let i=0;i<=3;i++) {  
            if(currentGameState.typed_answers[i] != questionsArr[currentGameState.questions_set][currentGameState.roundCounter].correct){ 
                elementToDelete.push(currentGameState.typed_answers[i]);
            }
        }
         
            elementToDelete.splice(randNumb,1);
         
        
            for(let k=0;k<=3;k++) {
                for(let i=0;i<=1;i++) {
                    if(elementToDelete[i] === currentGameState.typed_answers[k])
                        currentGameState.typed_answers.splice(k,1);
                }
            }

            for(let k=0;k<=3;k++) {
                for(let i=0;i<=1;i++) {
                    if(elementToDelete[i] === $(gameAnswersContainers[k]).text()) {
                        $(gameAnswersContainers[k]).text("");
                    }
                }
            }
    },
    question_public: function() {
        var percentage = document.createElement('div');
        $(percentage).addClass('game-wrapper__percentage');
        $('.game-wrapper__helpers').append(percentage);
        function generate(max, thecount) {
            var perc_block = [];
            var perc_bar = [];
            var perc_text = []

            for(let i=0; i<thecount;i++) {
                perc_block[i] = document.createElement('div');
                perc_bar[i] = document.createElement('div');
                perc_text[i] = document.createElement('div');

                $(perc_block[i]).addClass('game-wrapper__percentage-block');
                $(perc_bar[i]).addClass('game-wrapper__percentage-bar');
                $(perc_text[i]).addClass('game-wrapper__percentage-text');

                $(perc_block[i]).append(perc_bar[i]);
                $(perc_block[i]).append(perc_text[i]);
                $(percentage).append(perc_block[i]); 
            }
            var r = [];
            var currsum = 0;
            for(let i=0; i<thecount; i++) {
                r.push(Math.random());
                currsum += r[i];
            }
            for(let i=0; i<r.length; i++) {
                r[i] = Math.round(r[i] / currsum * max);
            }
            return r;
        }

        var arr = generate(100,currentGameState.typed_answers.length);
        var percentage_bar = $('.game-wrapper__percentage-bar');
        var percentage_text = $('.game-wrapper__percentage-text');
        var chance = Math.round(Math.random() *99 +1);
        var correct_pos;
        var gameAnswersContainers = $('.game-wrapper__answers__item');

        var largest = Math.max.apply(Math, arr); 
        var place_largest = arr.indexOf(largest);

        
        function move(arr ,from, to) {
            arr.splice(to, 0, arr.splice(from, 1)[0]);
        };
        
        // Array Sorted while chance is 70% and under
        for(let i=0;i<currentGameState.typed_answers.length;i++) {
            if(currentGameState.typed_answers[i] == questionsArr[currentGameState.questions_set][currentGameState.roundCounter].correct && chance < 70)
                correct_pos = i;
        }
        move(arr,place_largest,correct_pos);
  

        for(let i=0;i<percentage_bar.length;i++) {
            $(percentage_bar[i]).animate({height:arr[i]+"%"},700);
            $(percentage_bar[i]).text(arr[i]);
            $(percentage_text[i]).text(currentGameState.typed_answers[i]);
             
        }
    },
    phone_friend: function() {
        var chance = Math.round(Math.random() *99 +1);
        var phoneFriendWrapper = $('.game-wrapper__phone-friend');


     
        function generateRandomNumb() {
            var rand = Math.round(Math.random() *(currentGameState.typed_answers.length-1)); 
    
            if(currentGameState.typed_answers[rand] == questionsArr[currentGameState.questions_set][currentGameState.roundCounter].correct) { // If the rand == correct answer numb so repeat a function
                rand = generateRandomNumb();
            }

            return rand;
            
        }

        if (chance <= 70) {
            $(phoneFriendWrapper).append("Myślę, że poprawna odpowiedź to " + questionsArr[currentGameState.questions_set][currentGameState.roundCounter].correct);
        }
        if (chance > 70) {
            var abg = generateRandomNumb();
            $(phoneFriendWrapper).append("Myślę, że poprawna odpowiedź to " + currentGameState.typed_answers[abg]);
        }
    }
}

$('.play-btn').click(function() {
    playBtn();
});

$(document).keypress(function(e) {
    if(e.which == 13 && $('#nick-input').val()) { 
        localStorage.setItem('playerNick',$('#nick-input').val());
        $.getJSON("questions-answers.json",function(result) {
            getData(result);
            startGame();
        });  
    }
});

function playBtn() {
    $('.game-wrapper__answers__item').off('click');
    $('.help-btn').on('click');
    if($('#nick-input').val()) 
        localStorage.setItem('playerNick',$('#nick-input').val());
        $.getJSON("questions-answers.json",function(result) {
            getData(result);
            startGame();
    });   
}

function startGame() {
    $(document).off('keypress');
    playerNick = $('#nick-input').val();
    $('.help-btn').prop('disabled',false);
    $('.help-btn').removeClass('help-used');
    $('.start-screen').css('display','none');
    $('.game-wrapper').css('display','block');
    $('#player-name').text(playerNick);
    currentGameState = new gameStateProt();
    
    newRound();
    // startGame -- => initialization first round 
}

function newRound() { 
    $('.game-wrapper__answers__item').removeClass('clicked correct incorrect');
    $('.help-btn').prop('disabled',false);
    $('.help-used').prop('disabled',true);
    var answer;
    $('.game-wrapper__info').text("");

    $('.game-wrapper__percentage').text("");
    $('.game-wrapper__phone-friend').text("");

    loadQuestionAnswers();
    takeAnswer();

}

function loadQuestionAnswers() {
    var gameAnswersContainers = $('.game-wrapper__answers__item');

    $('.game-wrapper__question').text(questionsArr[currentGameState.questions_set][currentGameState.roundCounter].question);
    $('.target-amount__money').text(cashArr[currentGameState.roundCounter].amount);
    $('.question-number__counter').text(currentGameState.roundCounter + 1);
    


    for(let k=0;k<gameAnswersContainers.length;k++) {
        $(gameAnswersContainers[k]).text(questionsArr[currentGameState.questions_set][currentGameState.roundCounter].answer[k]);
    }
    currentGameState.typed_answers = questionsArr[currentGameState.questions_set][currentGameState.roundCounter].answer;
}
function takeAnswer() {
    $('.game-wrapper__answers__item').click(function() {
        var that = $(this);
        var selected_answer = $(this).text();
        $(this).addClass('clicked');
        var checAnswerSound = new Audio('sounds/orch_tension.mp3');
        checAnswerSound.play();
        
        if (selected_answer)
            $('.game-wrapper__answers__item').off("click");
            $('.help-btn').prop('disabled',true);
            setTimeout(function(){showResult(validateRightAnswer(selected_answer,that));},3000)
            
    });
    return false;
}
function validateRightAnswer(answer,cl) {
    var successSound = new Audio('sounds/correctAnswer.wav');
    if(answer.includes(questionsArr[currentGameState.questions_set][currentGameState.roundCounter].correct))  {
        successSound.play();
        cl.addClass('correct');
        return true;
    }
    else {
        cl.addClass('incorrect');
        return false;
    }
}

function showResult(arg) {
    var replayBtn = document.createElement('button');
    $(replayBtn).text('Zagraj ponownie');
    $(replayBtn).addClass('play-btn');
    $(replayBtn).click(function() {
        playBtn();
    });

    if(arg) {
        $('.game-wrapper__info').text("Brawo, wybrałeś prawidłową odpowiedź! ");
        currentGameState.roundCounter +=1 ;
        currentGameState.earnedMoney = cashArr[currentGameState.roundCounter];
        if(currentGameState.roundCounter == 12) {
            $('.game-wrapper__info').html("Brawo, wygrałeś MILION złotych!"+"<br> Czy chcesz zagrać ponownie?");
            $('.game-wrapper__info').append(replayBtn);
            var winGameSound = new Audio('sounds/winGame.mp3');
            winGameSound.play();
            return false;
        }
        setTimeout(newRound,2200);
    }
    else {
        var looseGameSound = new Audio('sounds/looseGame.mp3');
        looseGameSound.play();
        $('.game-wrapper__info').text("Niestety nie jest to poprawna odpowiedź. Prawidłowa odpowiedź to: " + questionsArr[currentGameState.questions_set][currentGameState.roundCounter].correct);
        $('.game-wrapper__info').append(replayBtn);
    }
}
})();


