const updateName = {
    inLoginScreen() {
        const playerNick = localStorage.getItem('playerNick'); // pobranie ostatnio uzywanego nicku z localStorage
        $('#nick-input').val(playerNick); //nadpisanie w inpucie Nicku
    },
    inGameScreen() {
        const playerNick = $('#nick-input').val();  //pobranie z inputa Nicku
        $('#player-name').text(playerNick); // aktualizacja w grze Nicku
    }
}

export default updateName;