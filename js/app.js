(function() {

    // var rand = Math.round(Math.random() * 99) +1;
    
    // if(rand <=65) {
    //     console.log("pierwszy if: liczba jest mniejsza od 65 lub równa, liczba wynosi:" + rand);
    //     return false;
    // }
    //   if(rand <=75) {
    //     console.log("drugi if: liczba jest mniejsza od 75 lub równa, liczba wynosi:" + rand);
    //     return false;
    // }
    //   if(rand <=85) {
    //     console.log("trzeci if: liczba jest mniejsza od 85 lub równa, liczba wynosi:" + rand);
    //     return false;
    // }
   
  
      

$.getJSON("questions-answers.json",function(result) {
    getData(result);
});


var oldQuestionsSet = localStorage.getItem('oldQuestionsSet'); // load number of questions set
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
// resetGameState() after loose or win;
// startNewRound();
// endRoundState boolean
// var roundCounter;

// changes on typed answers
};
 
$('.help-btn').click(function() {
    $(this).prop('disabled',true);
    $(this).addClass('help-used');
});
$('.fifty-btn').click(function() { ///////////////// PRZENIESC W INNE MIEJSCE
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
                //currentGameState.typed_answers.splice($.inArray(currentGameState.typed_answers[i],currentGameState.typed_answers),1);
                elementToDelete.push(currentGameState.typed_answers[i]);
            }
        }
         
            elementToDelete.splice(randNumb,1);
         
        
            for(var k=0;k<=3;k++) {
                for(var i=0;i<=1;i++) {
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
    
     
        // zmienna ktora okresla ktora odpowiedz z przedzialu petli ma być usunięta
    },
    question_public: function() {
        var percentage = document.createElement('div');
        $(percentage).addClass('game-wrapper__percentage');
        $('.game-wrapper__helpers').append(percentage);
        function generate(max, thecount) {
            var perc_block = [];
            var perc_bar = [];
            var perc_text = []

            for(var i=0; i<thecount;i++) {
                perc_block[i] = document.createElement('div');
                perc_bar[i] = document.createElement('div');
                perc_text[i] = document.createElement('div');

                $(perc_block[i]).addClass('game-wrapper__percentage-block');
                $(perc_bar[i]).addClass('game-wrapper__percentage-bar');
                $(perc_text[i]).addClass('game-wrapper__percentage-text');

                // block(bar,text)
                $(perc_block[i]).append(perc_bar[i]);
                $(perc_block[i]).append(perc_text[i]);
                $(percentage).append(perc_block[i]); //
            }
            var r = [];
            var currsum = 0;
            for(var i=0; i<thecount; i++) {
                r.push(Math.random());
                currsum += r[i];
            }
            for(var i=0; i<r.length; i++) {
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
        for(var i=0;i<currentGameState.typed_answers.length;i++) {
            if(currentGameState.typed_answers[i] == questionsArr[currentGameState.questions_set][currentGameState.roundCounter].correct && chance < 70)
                correct_pos = i;
        }
        move(arr,place_largest,correct_pos);
  
        console.log(percentage_bar.length);
        for(var i=0;i<percentage_bar.length;i++) {
           // $(percentage_bar[i]).css("height",arr[i]+"%");
            $(percentage_bar[i]).animate({height:arr[i]+"%"},700);
            $(percentage_bar[i]).text(arr[i]);
            // console.log('.game-wrapper__percentage-text');
             $(percentage_text[i]).text(currentGameState.typed_answers[i]);
             
        }
        // if chance <= 70 so give the correct answer the highest percentage numb 
        // maybe gives the highest number on position in which i find the correct answer 
    },
    phone_friend: function() {
        var chance = Math.round(Math.random() *99 +1);
        var phoneFriendWrapper = $('.game-wrapper__phone-friend');


        console.log(chance);
     
        function generateRandomNumb() {
            var rand = Math.round(Math.random() *(currentGameState.typed_answers.length-1)); 
            console.log(rand);
            console.log(currentGameState.typed_answers[rand]);
            console.log(questionsArr[currentGameState.questions_set][currentGameState.roundCounter].correct);
            if(currentGameState.typed_answers[rand] == questionsArr[currentGameState.questions_set][currentGameState.roundCounter].correct) { // If the rand == correct answer numb so repeat a function
                rand = generateRandomNumb();
            }

            return rand;
            
        }
        console.log(currentGameState.typed_answers);
        if (chance <= 70) {
            $(phoneFriendWrapper).append("Myślę, że poprawna odpowiedź to " + questionsArr[currentGameState.questions_set][currentGameState.roundCounter].correct);
        }
        if (chance > 70) {
            var abg = generateRandomNumb();
            console.log(abg);
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

function newRound() { // if roundCounter <=12 && endRoundState is true newRound();
    $('.game-wrapper__answers__item').removeClass('clicked correct incorrect');
    $('.help-btn').prop('disabled',false);
    $('.help-used').prop('disabled',true);
    var answer;
    $('.game-wrapper__info').text("");

    $('.game-wrapper__percentage').text("");
    $('.game-wrapper__phone-friend').text("");

    loadQuestionAnswers();
    takeAnswer();

    // currentGameState.roundCounter +=1 ;
}

function loadQuestionAnswers() {
    console.log(questionsArr[currentGameState.questions_set][currentGameState.roundCounter].correct);
    var gameAnswersContainers = $('.game-wrapper__answers__item');

    $('.game-wrapper__question').text(questionsArr[currentGameState.questions_set][currentGameState.roundCounter].question);
    $('.target-amount__money').text(cashArr[currentGameState.roundCounter].amount);
    $('.question-number__counter').text(currentGameState.roundCounter + 1);
    


    for(var k=0;k<gameAnswersContainers.length;k++) {
        $(gameAnswersContainers[k]).text(questionsArr[currentGameState.questions_set][currentGameState.roundCounter].answer[k]);
    }
    currentGameState.typed_answers = questionsArr[currentGameState.questions_set][currentGameState.roundCounter].answer;
    //console.log(currentGameState.typed_answers);
   

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
        console.log("correct");
        successSound.play();
        cl.addClass('correct');
        return true;
    }
    else {
        console.log("incorrect");
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

/*  
    If end game by win or loose show finish screen with game result and replay button
    If player fill name field, and press ENTER start new game
    If start new round, load question and answers to choose
    If player choose right answer, do the animation, show money and do the next round and show next question and answers      
    If game is ended by win or loose show Start button and final money
    If helper is used remove the possibility of reuse
    If one helper is used, let this affect the answers in other helpers
    If one questions set is used before, use another set in next game


    $$$ HELPERS $$$
        1. Fifty-fifty - gives a 2 of 4 answers(one correct and one incorrect) // correct answer, and second answer which is not correct
                If phone to friend or question to public, include answer from helper.
                If question to public show answers,  50 % chance to show the second mostly common chosen answer them in fifty-fifity.
                If phone to friend is show answer who has not right, 75 % to show this answer in fifty fifty

                using: remove 2 wrong answer
        2. Phone to friend // 75%
            If fifty fifty is used 80% chance to show correct answer
            If question to public is used 80% chance to show correct answer

            using: 
        3. Question to public
            If fifty fifty is used, draw between the two remaining answers
            using: 

        variable who has % chance to correct answer
        if next helper is used add 10 % ability to show right answer in using the next helper
        * Helper 65% chance to show correct answer
       ** Helper 75% chance to show correct answer
      *** Helper 85% chance to show correct answer
   

      if(generate rand <=65) {
          show correct answer
      }
       else if(generate rand <=75) {
          show correct answer
      }
       else if(generate rand <=85) {
          show correct answer
      }

      TO DO ::: 
        - HELPERS
        - remove possibility of reuse helpers
        - BUGFIX REPLAY GAME MUST RETURN ANOTHER QUESTIONS SET IN NEW GAME
        - BUGFIX REFRESH GAME WHILE FAST REFRESH, RETURN THE (Uncaught TypeError: Cannot read property 'length' of undefined) IN CONSOLE
        - IF NEW GAME RETURN THE POSSIBILITY OF USE A HELPERS
        - FINISH GAME WINDOW
        - BETTER GRAPHIC DESIGN
        - ANIMATION AND TIME CONFIGURE
        - MORE QUESTIONS SET IN JSON
        - SOUNDS TO GAME (TO HELPERS,BACKGROUND SOUND, AND CHECK A ANSWER)
        - COMMANDS INFO FROM AUTOMAT GAME



        fifty fifty 
        - usun 2 losowe niepoprawne z 4 odpowiedzi, z ktorych zadna nie jest correct

        -question public 
        - losowanie 4 liczb(szansa że poprawna odpowiedz bedzie miala najwiecej głosów publicznosci wynosi 65 %)
        - 4 wylosowane liczby procentowe razem wynoszą 100%
        - 65% szansy na to, aby najwieksza wylosowana liczba była odpowiedzią poprawną

        if(repeat) its true then {
            
            repeat = false;
        }
*/ 
})();


