// Import the functions you need from the SDKs you need
// Importa las funciones necesarias desde los SDKs de Firebase que se van a utilizar.
import { initializeApp } from "firebase/app"; // Función para inicializar la app de Firebase.
import { getAuth } from "firebase/auth"; // Función para gestionar la autenticación.
import { getFirestore } from 'firebase/firestore/lite'; // Función para gestionar la base de datos Firestore en modo lite.
import { getEnvironments } from "../helpers/getEnvironments";
// console.log(import.meta.env);
// console.log(process.env)

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
  VITE_MEASUREMENTID
} = getEnvironments();

// TODO: Add SDKs for Firebase products that you want to use
// Indica agregar otros SDKs de Firebase si necesitas más productos (como Analytics, Cloud Storage, etc.).
// Más información: https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Configuración de Firebase para conectar la aplicación con tu proyecto en Firebase.
//Dev/prod
// const firebaseConfig = {
//   apiKey: "AIzaSyBoGQE2rE2-Tf-XGMhVRHP040SDUVBq81c", // Clave de API única para tu proyecto.
//   authDomain: "react-course-ce419.firebaseapp.com", // Dominio de autenticación para tu proyecto.
//   projectId: "react-course-ce419", // ID del proyecto de Firebase.
//   storageBucket: "react-course-ce419.appspot.com", // Almacén de archivos en la nube.
//   messagingSenderId: "409262439699", // ID para enviar mensajes (como notificaciones push).
//   appId: "1:409262439699:web:d5b64bae7da90dbf402ee6" // ID único de la aplicación.
// };

//testing
// const firebaseConfig = {
//   apiKey: "AIzaSyBsHvUYXbCo-mU3rHACynvA_5nqJMGg2s0",
//   authDomain: "cerveceria-sinu.firebaseapp.com",
//   projectId: "cerveceria-sinu",
//   storageBucket: "cerveceria-sinu.firebasestorage.app",
//   messagingSenderId: "813040371911",
//   appId: "1:813040371911:web:8a3836e812df8de86896e2",
//   measurementId: "G-CPDEKHVSDV"
// };

const firebaseConfig = {
  apiKey:VITE_APIKEY,
  authDomain:VITE_AUTHDOMAIN,
  projectId:VITE_PROJECTID,
  storageBucket:VITE_STORAGEBUCKET,
  messagingSenderId:VITE_MESSAGINGSENDERID,
  appId:VITE_APPID,
  measurementId:VITE_MEASUREMENTID
};

// console.log(firebaseConfig) //Con este clg se imprime exactamente que API usa cada quien prod/test
// firebaseConfig.projectId.match(/react-course/gi) ? console.log('Tengo las APIKEY de produc') : console.log('Tengo las APIKEY de test');

// Initialize Firebase
// Inicializa la aplicación de Firebase con la configuración proporcionada.
export const FirebaseApp = initializeApp(firebaseConfig);

// Configura Firebase Authentication para gestionar usuarios y autenticación.
export const FirebaseAuth = getAuth(FirebaseApp);

// Configura Firebase Firestore para gestionar la base de datos en tiempo real.
export const FirebaseDB = getFirestore(FirebaseApp);
