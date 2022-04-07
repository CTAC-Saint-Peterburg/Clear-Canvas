// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpytqsGx7MypD447_-OIy5p4anYiTcx2s",
  authDomain: "tridentsbattledatabase.firebaseapp.com",
  databaseURL: "https://tridentsbattledatabase-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tridentsbattledatabase",
  storageBucket: "tridentsbattledatabase.appspot.com",
  messagingSenderId: "1004336424534",
  appId: "1:1004336424534:web:574e71b095acd6082dfdf7"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
console.log(appFirebase);
function writeFirebaseData(userId) {

let testData = getDatabase();
let referance = ref(testData, 'users/' + userId);
set(referance, {
  name: "blob",
  scores: 1,
  time: '01.01.1992'
});
}
writeFirebaseData('chebureck');
//