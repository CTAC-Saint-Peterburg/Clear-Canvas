let playerNickName = 'Unnamed';
let skinOptions = { colors : ['tomato','#fdca40', '#bde4a7', '#7a9cc6', '#3772ff'], counter: 0, selectedColor: 'tomato'};
function openCanvas() {
    document.querySelector('#canvas').style.display = 'block';
    player.color = skinOptions.selectedColor;
    player.text = playerNickName;
    document.querySelector('#mainDiv').style.display = 'none';
}
function enterNickName() {
    playerNickName = document.querySelector('#nameInput').value;
    document.querySelector('#PlayerNameOne').innerHTML = playerNickName;
    document.querySelector('#PlayerNameTwo').innerHTML = playerNickName;
}
function skinColorChange(PlusORMinus) {
    if (PlusORMinus == 'plus') {
        skinOptions.counter++;
        if (skinOptions.counter > skinOptions.colors.length - 1) {skinOptions.counter = 0};
    document.querySelector('.skin_view').style.backgroundColor = skinOptions.colors[skinOptions.counter];
    document.querySelector('#skinView').classList.remove('accept_glow');
    } else if (PlusORMinus == 'minus') {
        skinOptions.counter--;
        if (skinOptions.counter <= 0) { skinOptions.counter = skinOptions.colors.length - 1};
        document.querySelector('.skin_view').style.backgroundColor = skinOptions.colors[skinOptions.counter];
        document.querySelector('#skinView').classList.remove('accept_glow');
    }  
}
function acceptSkinColor() {
    skinOptions.selectedColor = skinOptions.colors[skinOptions.counter];
    document.querySelector('#skinView').classList.add('accept_glow');
};
function pageReload() {
    location.reload();
};
function gameOver(result) {
    document.querySelector('.gameOverUI').style.display = 'block';
    if (result == 1) {
        document.getElementById('gameOverUItext').innerHTML = 'You win!';
    } else if (result == 0) {
        document.getElementById('gameOverUItext').innerHTML = 'You lose;(';
    } else {console.log('game result error')};
}
//---shop options
let shopDivCount = 4;
function shopOptions(shopDivCount) {
    for (let i = 0; i < shopDivCount; i++) {
let divShop = document.createElement('div');
divShop.className = 'unlock_items';
document.getElementById('shopOptions').appendChild(divShop);
}
};
//-