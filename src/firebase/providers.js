import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
// Importa los métodos y clases necesarios de Firebase Authentication.
// `GoogleAuthProvider` se utiliza para configurar la autenticación con Google.
// `signInWithPopup` permite iniciar sesión con una ventana emergente.

import { FirebaseAuth } from "./config";
// Importa la instancia de autenticación de Firebase que configuraste previamente.

const googleProvider = new GoogleAuthProvider();
// Crea una nueva instancia del proveedor de autenticación de Google.

//esta funcion se encarga de logear al usuario con google
export const signInWithGoogle = async () => {
    // Función asincrónica para gestionar el inicio de sesión con Google.
    try {
        // Intenta ejecutar el flujo de inicio de sesión.
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // Muestra una ventana emergente para que el usuario inicie sesión con Google.

        // `result` contiene la información del usuario autenticado y los detalles del token.

        // const credentials = GoogleAuthProvider.credentialFromResult(result) //De esta manera se obtienen los token
        // (Opcional) Obtén las credenciales de Google si necesitas usarlas en algún lugar.

        const user = result.user;
        // Obtiene el objeto del usuario autenticado.

        const { displayName, email, photoURL, uid } = result.user;
        // Extrae información del usuario como el nombre, correo, foto de perfil y UID.

        return {
            ok: true,
            // Indica que el inicio de sesión fue exitoso.
            // User info
            displayName,
            email,
            photoURL,
            uid // Devuelve los datos del usuario autenticado.
        };

    } catch (error) {
        // Maneja los errores que puedan ocurrir durante el inicio de sesión.
        const errorCode = error.code;
        // Código del error que describe qué salió mal.
        const errorMessage = error.message;
        // Mensaje del error con más detalles.

        return {
            ok: false,
            // Indica que el inicio de sesión falló.
            errorMessage,
            // Devuelve el mensaje de error para mostrar o manejar.
        };
        console.log(error);
        // (Opcional) Registra el error en la consola para depuración.
    }
};


//Esta funcion se encarga de registrar al usuario con correo y contraseña
export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    try {
        console.log({ email, password, displayName })

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);//Con esto llegamos a fireBase
        const { uid, photoURL } = resp.user

        await updateProfile(FirebaseAuth.currentUser, { displayName }); //Con esto actualizamos los valores del perfil logeado actualmente en firebase

        return {
            ok: true,
            uid, photoURL, email, displayName
        }


    } catch (error) {
        // console.log(error)
        return {
            ok: false,
            // errorMessage: error.message
            errorMessage: 'Este correo ya se encuentra registrado.'
        }
    }

}

//Esta funcion se encarga de logear al usuario con correo y contraseña
export const loginWithEmailPassword = async ({ email, password }) => {

    try {

        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL, displayName } = resp.user
        // console.log(resp.user)

        return {
            ok: true,
            email, uid, photoURL, displayName
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: 'El usuario no esta registrado.'
        }

    }
}

//Esta funcion se encarga de cerrar la sesion, se peude omitir se se pone el codigo en el thunk
export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}

