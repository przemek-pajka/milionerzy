import play from './modules/play.js';
import updateName from './modules/updateName.js';

updateName.inLoginScreen();

$('.play-btn').click(function(e) {
    if($('#nick-input').val()) 
       play();
});

$(document).keypress(function(e) {
    if(e.which == 13 && $('#nick-input').val()) { 
       play();
    }
});