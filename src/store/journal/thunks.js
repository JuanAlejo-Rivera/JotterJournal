import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNote());


        const { uid } = getState().auth;//el getState me traera el estado global, de la aplicacion, useSelector no funciona aqui

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/Notas`));
        await setDoc(newDoc, newNote)

        newNote.id = newDoc.id;



        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));

    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth
        if (!uid) throw new Error('EL UID del usuario no existe');

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}



export const starSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving()); // Indica que la nota se está guardando

        const { uid } = getState().auth; // Obtiene el UID del usuario autenticado
        const { activeNote: note } = getState().journal; // Obtiene la nota activa del estado

        const noteToFireStore = { ...note }; // Crea una copia de la nota para no modificar el estado directamente
        delete noteToFireStore.id; // Elimina el campo 'id' ya que no es necesario en Firestore

        const docRef = doc(FirebaseDB, `${uid}/journal/Notas/${note.id}`); // Referencia al documento en Firestore
        await setDoc(docRef, noteToFireStore, { merge: true }); // Guarda la nota y fusiona con los datos existentes

        dispatch(updateNote(note)); // Actualiza la nota en el estado global
        
        
    }
}



export const startUploadingFiles = (files = []) => {
    return async (dispatch,getState) => {
        const {activeNote: note} = getState().journal;
// console.log(files)
        dispatch(setSaving());

        // await fileUpload (files[0]);
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }
        console.log(fileUploadPromises)
        
        const photosUrls = await Promise.all(fileUploadPromises);
        dispatch(setPhotosToActiveNote(photosUrls));

    }
}

export const starDeletingNote = () => {
    return async (dispatch, getState) => {
      const {uid} = getState().auth;
      const {activeNote: note} = getState().journal;
      
        const docRef = doc(FirebaseDB, `${uid}/journal/Notas/${note.id}`)
        const resp = await deleteDoc(docRef);
        
        dispatch(deleteNoteById(note.id));
    }
  }


//   export const updatePendingImages = (files = []) => {
//     return async (dispatch, getState) => {
//         dispatch(setSaving());
//         const fileUploadPromises = [];
//         for (const file of files) {
//             fileUploadPromises.push(fileUpload(file))
//             console.log(file)
//         }
//         console.log(fileUploadPromises)

//     }
//   }
