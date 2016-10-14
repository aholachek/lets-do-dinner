import firebase from 'firebase';

import { setUserId } from './index';
import store from 'store/index';

const config = {
   apiKey: "AIzaSyAPRgOdJjGdFkrefZC2rUuJ9Ht5D3iLtoM",
   authDomain: "letsgetdinnerfrontend.firebaseapp.com",
   databaseURL: "https://letsgetdinnerfrontend.firebaseio.com",
   storageBucket: "letsgetdinnerfrontend.appspot.com",
   messagingSenderId: "273402791989"
 };

 var initializedFirebase = firebase.initializeApp(config);

 firebase.auth().signInAnonymously().catch(function(error) {
   console.error(error)
 });

 firebase.auth().onAuthStateChanged(function(user) {
   if (user) {
     // User is signed in.
     var isAnonymous = user.isAnonymous;
     var uid = user.uid;
     store.dispatch(setUserId(uid));
   } else {
     // User is signed out.
     // ...
   }
   // ...
 });

 export default initializedFirebase;
