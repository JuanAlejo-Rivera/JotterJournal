import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";
import { FirebaseDB } from "../../../src/firebase/config";



describe('Prubeas en los thunks del journal', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('startNewNote, debe de crear una nueva nota', async () => {
        const uid = 'Test uid'
        getState.mockReturnValue({ auth:{uid}})

        await startNewNote()(dispatch, getState); 

        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            body:'',
            title:'',
            id:expect.any(String),
            date:expect.any(Number)
        }));
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            body:'',
            title:'',
            id:expect.any(String),
            date:expect.any(Number)
        }));

        //Borrar de firebase
        const colletionRef = collection(FirebaseDB, `${uid}/journal/Notas`);
        const docs = await getDocs(colletionRef);
        
        const deletePromises = [];
        docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)))
        await Promise.all(deletePromises)
      

    });

});
    
