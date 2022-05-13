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
// console.log(appFirebase);
//- write to firebase func()
function writeFirebaseData(userId) {
let db = appFirebase.database();
let referance = db.ref('users/' + userId);
let time = new Date();
let timeForFirebase = time.getDate() + "." + Number(time.getMonth() + 1) + "." + time.getFullYear();

function scoresCheck() {
let score = 1;
for (let i = 0; i < parsedDataFirebase.length; i++) {
  if(parsedDataFirebase[i].name == playerNickName) {
    return parsedDataFirebase[i].scores + 1;
  }
}
return 1;
}

// let data = {
//      name: playerNickName,
//      scores: scoresCheck(),
//      time: timeForFirebase
//    };
//    referance.push(data);
// };
referance.update({
         name: playerNickName,
         scores: scoresCheck(),
         time: timeForFirebase
});
};
//- read from firebase func()
let dataFirebase = new Array();
let parsedDataFirebase = new Array();
async function readFirebaseData() {
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
//-after read parse func()
function alldataFirebaseParse() {
  let dataFirebaseLength = Object.keys(dataFirebase);
  function dataFirebaseParse(index) {
    let readData = dataFirebase;
    let userId = Object.keys(readData);
    parsedDataFirebase[index] = readData[userId[index]];
    }
  for( let i =0; i < dataFirebaseLength.length; i++) {
    dataFirebaseParse(i);
  }
};
readFirebaseData().then(delay);
//-need to fix delay func()
function delay() {
  setTimeout(()=> alldataFirebaseParse(), 400);
  setTimeout(()=> showFirebaseDataInHtml(), 500);

};