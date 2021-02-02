import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBeXgcBLDtFoVC8f4UTncyzUpsv7C3RJRU",
  authDomain: "coloco-c3e8e.firebaseapp.com",
  projectId: "coloco-c3e8e",
  storageBucket: "coloco-c3e8e.appspot.com",
  messagingSenderId: "713011347321",
  appId: "1:713011347321:web:47061722e2ce07f6ce79a8",
  measurementId: "G-TENNJ54MZV",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };
