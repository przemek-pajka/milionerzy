import displayCallFriendResult from './displayCallFriendResult.js';
export default function callFriend(currentGameState) {
        const chance = Math.round(Math.random() *99 +1);
        const phoneFriendWrapper = $('.game-wrapper__phone-friend');
        
        displayCallFriendResult(chance,phoneFriendWrapper,currentGameState);
    }