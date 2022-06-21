// import { from } from "core-js/core/array";
import { initializeApp, getApps } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// const firebaseConfig = {
//     apiKey: "AIzaSyCoXfS6KAQBUTn_jrKuR97LoXZhbI_49y8",
//     authDomain: "logapp-b6cfc.firebaseapp.com",
//     projectId: "logapp-b6cfc",
//     storageBucket: "logapp-b6cfc.appspot.com",
//     messagingSenderId: "169012847205",
//     appId: "1:169012847205:web:9e5c330380a1dc344a9c8c"
//   };
const firebaseConfig = {
    apiKey: "AIzaSyDf7L5m7lnDXLNEdXpttZbQ957sY6dVMyw",
    authDomain: "logs-b989a.firebaseapp.com",
    projectId: "logs-b989a",
    storageBucket: "logs-b989a.appspot.com",
    messagingSenderId: "583616681674",
    appId: "1:583616681674:web:beb981cab2431e9d80c633",
    measurementId: "G-YT5XDTWHPK"
  };

  const apps=getApps();
  const app=!apps.length ? initializeApp(firebaseConfig) : apps[0];


  export const messaging= getMessaging(app);