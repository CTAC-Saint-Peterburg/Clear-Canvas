//-стандартные серверные переменные
var express = require('express');
var app = express();
var server = app.listen(3000);
app.use(express.static('public'));
console.log("сервер запущен...");
var socket = require('socket.io');
var io = socket(server);
//----------------------------
//-Переменная данных сервера myServer
let myServer = {
    userCount: 0,
    howManyRoomsNeed: undefined,

};
//---------------------------------
//-список переменных сервера
let playerSetup = {Pcords: 0, currentRoom: 0, localId: 1}; //- сетап позиции старта
//-----------------
io.sockets.on('connection', newConnection);
function newConnection(socket) {
    console.log("Клиент:" + socket.id);
    myServer.userCount++;
    myServer.howManyRoomsNeed = Math.ceil(myServer.userCount / 2);
    socket.join(myServer.howManyRoomsNeed);
    playerSetup.currentRoom = myServer.howManyRoomsNeed;
    console.log('Комната:'+ playerSetup.currentRoom);
    socket.emit('listenServerSetup', playerSetup); //-высылаем настройки спавна
    socket.on('listenServerSetup', definePlayerSetup);
    socket.on('kk', ksok);
}
function definePlayerSetup() {
    playerSetup.Pcords++;
    playerSetup.localId++;
    if(playerSetup.Pcords > 1) {playerSetup.Pcords = 0;}
    if(playerSetup.localId > 2) {playerSetup.localId = 1;}
};
function ksok(test) {
    let kek = test;
console.log(kek.x);
io.to(1).emit('kk', kek);
};