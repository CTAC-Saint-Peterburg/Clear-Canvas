
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
// let db = appFirebase.database();
// let referance = ref(db, 'users/' + userId);
function writeFirebaseData(userId) {
  let db = appFirebase.database();
  let referance = db.ref('users/' + userId);
  let time = new Date();
  let timeForFirebase = time.getDate() + "|" + Number(time.getMonth() + 1) + "|" + time.getFullYear();
  let data = {
          name: playerNickName,
          scores: 4,
          time: timeForFirebase
        };
        referance.push(data);
};