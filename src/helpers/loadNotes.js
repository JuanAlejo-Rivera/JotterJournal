import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async ( uid = '') => {
    if(!uid) throw new Error('EL UID del usuario no existe')  ;

    //No se puede usar collection para traer un documento, igual al contrario un doc para traer una coleccion
    const collectionRef = collection(FirebaseDB, `${uid}/journal/Notas`)
    const docs = await getDocs(collectionRef);

    const notes = [];
    docs.forEach( doc => {
        // console.log(doc.data())
        notes.push({id: doc.id, ...doc.data()}); //Extraemos el id de doc, expandimos los datos con ... he insertamos el id
    });

    // console.log(notes)
    return notes;
}