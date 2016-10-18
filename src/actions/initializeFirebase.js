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

 firebase.auth().onAuthStateChanged(function(user) {
   if (user) {
     const isAnonymous = user.isAnonymous;
     const uid = user.uid;
     store.dispatch(setUserId(uid));
   } else {
     firebase.auth().signInAnonymously().catch(function(error) {
       console.error(error)
     });
   }
 });

 export default initializedFirebase;
