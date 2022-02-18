let playerNickName = 'Unnamed';
function openCanvas() {
    document.querySelector('#canvas').style.display = 'block';
    player.text = playerNickName;
}
function enterNickName() {
    playerNickName = document.querySelector('#nameInput').value;
    document.querySelector('#PlayerNameOne').innerHTML = playerNickName;
    document.querySelector('#PlayerNameTwo').innerHTML = playerNickName;
}