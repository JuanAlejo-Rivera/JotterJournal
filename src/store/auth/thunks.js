import { deleteDoc, doc } from "firebase/firestore/lite";
import { FirebaseAuth, FirebaseDB } from "../../firebase/config";
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout, deleteNoteById } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice";

export const chekingAuthentication = (email, password, status) => {
  return async (dispatch) => {

    dispatch(checkingCredentials());

  }
}

export const startGoogleSignIn = () => {
  return async (dispatch) => {

    dispatch(checkingCredentials());

    const result = await signInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result))


  }
}



export const startCreatingUserWithEmailPassword = ({ email, displayName, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName })

    if (!ok) return dispatch(logout({ errorMessage }))

    dispatch(login({ uid, displayName, email, photoURL }))

  }
}


export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())

    const result = await loginWithEmailPassword({ email, password })
    if (!result.ok) return dispatch(logout(result))

    dispatch(login(result))
  }

}


export const startLogout = () => {
  return async (dispatch) => {

    await logoutFirebase();
    dispatch(clearNotesLogout())
    dispatch(logout());
    // await FirebaseAuth.signOut(); //Podemos dejar esta linea o la anterior, ambas hacen lo mismo, se salta el paso del provider

  }
}

