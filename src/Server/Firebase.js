import firebase from "firebase";
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';


var firebaseConfig = {
    apiKey: "AIzaSyAxVG_3z1_kb6B86M8c_k4KFamskSG7a7o",
    authDomain: "sundarban-lab.firebaseapp.com",
    databaseURL: "https://sundarban-lab.firebaseio.com",
    projectId: "sundarban-lab",
    storageBucket: "sundarban-lab.appspot.com",
    messagingSenderId: "513496562288",
    appId: "1:513496562288:web:03542d84d5cb8cd11312b5"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();


export default firebase;