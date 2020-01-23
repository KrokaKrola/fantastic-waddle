import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-mswBtyaarj55GKNbJ9f6muQf3SzN5zk",
  authDomain: "react-firebase-quizeapp.firebaseapp.com",
  databaseURL: "https://react-firebase-quizeapp.firebaseio.com",
  projectId: "react-firebase-quizeapp",
  storageBucket: "react-firebase-quizeapp.appspot.com",
  messagingSenderId: "691499679048",
  appId: "1:691499679048:web:4956917b4e6d0a6c7e477d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export async function googleAuthProvider() {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const { user, additionalUserInfo } = await firebase
      .auth()
      .signInWithPopup(provider);
    if (additionalUserInfo.isNewUser) {
      await db.doc(`/users/${user.uid}`).set({
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL,
        correctAnswers: 0,
        totalQuestions: 0,
        wrongAnswers: 0
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export const db = firebase.firestore();

export const auth = () => firebase.auth();
