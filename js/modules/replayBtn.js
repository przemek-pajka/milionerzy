import play from './play.js';
export default {
    replayBtn: document.createElement('button'),
    init() {
        $(this.replayBtn).addClass('play-btn'),
        $(this.replayBtn).text('Zagraj ponownie'),
        $(this.replayBtn).click(()=>{
            play();
        })
        return this.replayBtn;
    }
}