import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        activeNote: null,
        // active:{
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 12345,
        //     imageUrls: [], //['https://hola.com/123 ']
        // }
    },


    
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        //Crear una nueva entrada
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        //Activar la nota, lo inserta en el store
        setActiveNote: (state, action) => {
            state.activeNote = action.payload;
            state.messageSaved = '';
        },
        //cargar notas
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        //Guardar una nota
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        //Actualizar notas cuando se guardan
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if(note.id === action.payload.id){
                    return action.payload;
                }
                return note;
            });
            state.messageSaved = `${action.payload.title}, actualizado correctamente`
        },
        setPhotosToActiveNote: (state, action) => {
            state.isSaving = false;
            
            if (!Array.isArray(state.activeNote.imageUrls)) {
                state.activeNote.imageUrls = [];
            }
        
            state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...action.payload];
        },
        clearNotesLogout: (state) =>{
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.activeNote = null;
        },
        //Borrar uan nota por id
        deleteNoteById: (state, action) => {
            state.activeNote= null;
            state.notes = state.notes.filter(note => note.id !==action.payload);

        },


    
    }
});


// Action creators are generated for each case reducer function
//Acciones que puedo llamr para ejecutar una tarea
export const {
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    savingNewNote,
    setPhotosToActiveNote,
    clearNotesLogout,
} = journalSlice.actions;