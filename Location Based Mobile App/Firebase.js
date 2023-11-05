import firebase from "@react-native-firebase/app"
import {getFirestore} from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBoVMK6BzxyVxMQp8nN1jZopR8v-25KB0s",
    authDomain: "bitirmeprojesi-b68b4.firebaseapp.com",
    projectId: "bitirmeprojesi-b68b4",
    storageBucket: "bitirmeprojesi-b68b4.appspot.com",
    messagingSenderId: "443745378404",
    appId: "1:443745378404:web:1afa0d9777a2f5946aff71",
    measurementId: "G-X3NP3YJEEM"
  };

  export const app = firebase.initializeApp(firebaseConfig);
  export const database =getFirestore(app);