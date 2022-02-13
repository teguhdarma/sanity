import firebase from 'firebase/app'
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBxQsT87kpAoIXZi6ff7r2zHyz3twBZLX4",
    authDomain: "fuck-app-390ab.firebaseapp.com",
    projectId: "fuck-app-390ab",
    storageBucket: "fuck-app-390ab.appspot.com",
    messagingSenderId: "973363617554",
    appId: "1:973363617554:web:116f424f36b18ccbad5dcb",
    measurementId: "G-P7VGPG9C6R"
  }
if (firebase.apps.length == 0){
    firebase.initializeApp(firebaseConfig)
    

}
