import firebase from 'firebase';
import ApiKeys from '../constants/ApiKeys';
require("firebase/firestore");

// initialize firebase
firebase.initializeApp(ApiKeys.FirebaseConfig);

// initialize firestore
var firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true};
firestore.settings(settings);

export { firebase, firestore };
