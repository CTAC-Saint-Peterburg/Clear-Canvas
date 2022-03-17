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
let playerSetup = {Pcords: 0, currentRoom: 0}; //- сетап позиции старта
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
    socket.on('playerData', ksok);
    function definePlayerSetup() {
        playerSetup.Pcords++;
        if(playerSetup.Pcords > 1) {playerSetup.Pcords = 0;}
    }
    function ksok(playerToServer) {
        let playerToClient = playerToServer;
    socket.to(playerToServer.room).emit('playerData', playerToClient);
    }
};