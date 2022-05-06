//- initialize firebase
const firebaseConfig = {
  apiKey: "AIzaSyCpytqsGx7MypD447_-OIy5p4anYiTcx2s",
  authDomain: "tridentsbattledatabase.firebaseapp.com",
  databaseURL: "https://tridentsbattledatabase-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tridentsbattledatabase",
  storageBucket: "tridentsbattledatabase.appspot.com",
  messagingSenderId: "1004336424534",
  appId: "1:1004336424534:web:574e71b095acd6082dfdf7"
};
const appFirebase = firebase.initializeApp(firebaseConfig);
console.log(appFirebase);
//- write to firebase func()
function writeFirebaseData(userId) {
let db = appFirebase.database();
let referance = db.ref('users/' + userId);
let time = new Date();
let timeForFirebase = time.getDate() + "." + Number(time.getMonth() + 1) + "." + time.getFullYear();
let data = {
     name: playerNickName,
     scores: 4,
     time: timeForFirebase
   };
   referance.push(data);
};
//- read from firebase func()
let dataFirebase;
let dataFirebaseLength;
let parsedDataFirebase = new Array();
function readFirebaseData() {
let db = appFirebase.database();
let referance = db.ref('users/');
referance.on('value', getData, errorFirebase);
function getData(data) {
dataFirebase = data.val();
}
function errorFirebase(err) {
console.log('что-то пошло нитак блин!');
}
}
function alldataFirebaseParse() {
  dataFirebaseLength = Object.keys(dataFirebase);
  function dataFirebaseParse(index) {
    let readData = dataFirebase;
    let userId = Object.keys(readData);
    let randomFirebaseId = readData[userId[index]];
    let objectKeys = Object.keys(randomFirebaseId);
    parsedDataFirebase[index] = randomFirebaseId[objectKeys[0]];
    // console.log(parsedDataFirebase[index]);
    }
  for( let i =0; i < dataFirebaseLength.length; i++) {
    dataFirebaseParse(i);
  }
}
readFirebaseData();