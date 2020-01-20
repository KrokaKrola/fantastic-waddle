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
  await db.doc(path).set({ ...data }, { merge: true });
}

export async function removeDoc(path) {
  await db.doc(path).delete();
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

export function setWarning(message, descr) {
  notification.warning({
    message: message,
    description: descr,
    placement: 'bottomRight'
  })
}

export const colorGeneration = id =>
  `rgb(${id * 2 + Math.random() * 100}, ${id * 3 + Math.random() * 125}, ${id *
    4 +
    Math.random() * 75})`;

export const objectLen = obj => Object.keys(obj).length;

export const trivia = axios.create({
  baseURL: 'https://opentdb.com/',
  timeout: 2000
});

export function rainbowStop(h) {
  h = h / 15 ;
  let f = (n, k = (n + h * 12) % 12) =>
    0.5 - 0.5 * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  let rgb2hex = (r, g, b) =>
    '#' +
    [r, g, b]
      .map(x =>
        Math.round(x * 255)
          .toString(16)
          .padStart(2, 0)
      )
      .join('');
  return rgb2hex(f(0), f(8), f(4));
}

export function subscribeToCollection(path, callback) {
  try {
    db.collection(path).onSnapshot(callback);
  } catch(error) {
    setErrors(error.message);
  }
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
export function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}