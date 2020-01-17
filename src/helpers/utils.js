import { auth, db } from '../firebase';
import { notification } from 'antd';
import axios from 'axios';

export const loadingStyle = {
  pointerEvents: 'none',
  opacity: 0.5
};

export async function createUserWithEmailAndPassword({
  displayName,
  email,
  password,
  photoURL = 'https://placekitten.com/200/200'
}) {
  try {
    const { user } = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    await user.updateProfile({
      displayName,
      photoURL
    });
    await db.doc(`/users/${user.uid}`).set({
      displayName: displayName,
      email: email,
      uid: user.uid,
      photoURL: photoURL,
      topScore: 0
    });
  } catch (error) {
    // Handle Errors here.
    throw new Error(error.message);
  }
}

export async function signInWithEmailAndPassword(data) {
  try {
    return await auth().signInWithEmailAndPassword(data.email, data.password);
  } catch (error) {
    throw new Error(error.message);
  }
}

export function logout() {
  auth()
    .signOut()
    .catch(function(error) {
      console.error(error);
    });
}

export function onAuthStateChanged(callback) {
  return auth().onAuthStateChanged(function(auth) {
    callback(auth);
  });
}

export async function setDoc(path, data) {
  await db.doc(path).set({ data }, { merge: true });
}

export async function getDoc(path) {
  const doc = await db.doc(path).get();
  if (doc.exists) {
    return doc.data();
  }
}

export function uniqueId() {
  return (
    '_' +
    (
      Number(String(Math.random()).slice(2)) +
      Date.now() +
      Math.round(performance.now())
    ).toString(36)
  );
}

export function setErrors(error) {
  notification.error({
    message: 'Something went wrong!',
    description: error.message,
    placement: 'bottomRight'
  });
}

export const objectLen = obj => Object.keys(obj).length;

export const trivia = axios.create({
  baseURL: 'https://opentdb.com/',
  timeout: 1000
});