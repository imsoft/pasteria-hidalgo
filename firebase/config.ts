// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMxDYvRoVpvCrgm0Wu0ZHdEBnaU16A3Ec",
  authDomain: "la-casa-del-paste.firebaseapp.com",
  projectId: "la-casa-del-paste",
  storageBucket: "la-casa-del-paste.appspot.com",
  messagingSenderId: "231895673266",
  appId: "1:231895673266:web:6cdc8ae207d5d7b867dcab",
  measurementId: "G-807S950Z55",
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseStorage = getStorage(FirebaseApp);

export const uploadFile = async (
  file: any,
  fileName: string
): Promise<string> => {
  const storageRef = ref(FirebaseStorage, `/apartado-juridico/${fileName}`);
  await uploadBytes(storageRef, file);
  const url = getDownloadURL(storageRef);
  return url;
};
