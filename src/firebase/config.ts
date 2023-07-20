/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const APIKEY = import.meta.env.VITE_APIKEY;
const AUTHDOMAIN = import.meta.env.VITE_AUTHDOMAIN;
const PROJECTID = import.meta.env.VITE_PROJECTID;
const STORAGEBUCKET = import.meta.env.VITE_STORAGEBUCKET;
const MESSAGINGSENDERID = import.meta.env.VITE_MESSAGINGSENDERID;
const APPID = import.meta.env.VITE_APPID;
const MEASUREMENTID = import.meta.env.VITE_MEASUREMENTID;

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
  measurementId: MEASUREMENTID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
