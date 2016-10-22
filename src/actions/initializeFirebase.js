import firebase from 'firebase';

import { setUserId } from './index';
import store from 'store/index';

const config = {
apiKey: "AIzaSyCFQNOZwtRjmRnPCCIKLKhcdyqm7rhKzbY",
 authDomain: "lets-do-dinner.firebaseapp.com",
 databaseURL: "https://lets-do-dinner.firebaseio.com",
 storageBucket: "lets-do-dinner.appspot.com",
 messagingSenderId: "341522968965"
 };

 var initializedFirebase = firebase.initializeApp(config);

 firebase.auth().onAuthStateChanged(function(user) {
   if (user) {
     const uid = user.uid;
     store.dispatch(setUserId(uid));
   } else {
     firebase.auth().signInAnonymously().catch(function(error) {
       console.error(error)
     });
   }
 });

 export default initializedFirebase;
