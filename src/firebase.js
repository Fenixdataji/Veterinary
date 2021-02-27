import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  
    apiKey: "AIzaSyCG2iSxVAjeoxJvPv49a8HAbvNExDBTbPc",
    authDomain: "veterinary-9a0a4.firebaseapp.com",
    projectId: "veterinary-9a0a4",
    storageBucket: "veterinary-9a0a4.appspot.com",
    messagingSenderId: "686460473976",
    appId: "1:686460473976:web:6766ecdd5bd76fe698138d"
  }
  
  export const firebaseApp =firebase.initializeApp(firebaseConfig)