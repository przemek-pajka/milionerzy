import fiftyFifty from './fiftyFifty/fiftyFifty.js';
import questionPublic from './questionPublic/questionPublic.js';
import callFriend from './callFriend/callFriend.js';
export default {
    call: function(e,currentGameState) { 
         switch(e) {
            case 'fiftyFifty': fiftyFifty(currentGameState); break;
            case 'questionPublic': questionPublic(currentGameState); break;
            case 'callFriend': callFriend(currentGameState); break;
         }
    },
 }