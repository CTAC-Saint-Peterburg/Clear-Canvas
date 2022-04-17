let firebaseConfig;
let appFirebase;
let writeFirebaseData;
const INIT_FIREBASE = () => {
// Your web app's Firebase configuration
  firebaseConfig = {
    apiKey: "AIzaSyCpytqsGx7MypD447_-OIy5p4anYiTcx2s",
    authDomain: "tridentsbattledatabase.firebaseapp.com",
    databaseURL: "https://tridentsbattledatabase-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tridentsbattledatabase",
    storageBucket: "tridentsbattledatabase.appspot.com",
    messagingSenderId: "1004336424534",
    appId: "1:1004336424534:web:574e71b095acd6082dfdf7"
  };

// Initialize Firebase
  appFirebase = initializeApp(firebaseConfig);
  console.log(appFirebase);

  writeFirebaseData = function (userId) {
  console.log(userId, 'sending');
    let testData = getDatabase();
    let referance = ref(testData, 'users/' + userId);
    let time = new Date();
    let timeForFirebase = time.getDate() + "|" + Number(time.getMonth() + 1) + "|" + time.getFullYear();
    set(referance, {
      name: playerNickName,
      scores: 1,
      time: timeForFirebase
    });
  }
}
//
