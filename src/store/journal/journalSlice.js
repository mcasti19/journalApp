import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice( {
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        activeNote: null,
        // active: {
        //     id: 'ABC123',
        //     title: 'Hola Mundo',
        //     body: 'Cuerpo de mi nota',
        //     date: 0,
        //     imageUrls: [],
        // }
    },
    reducers: {

        savingNewNote: ( state ) => {
            state.isSaving = true;
        },

        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
            console.log( 'Guardando nota' );
        },

        setActiveNote: ( state, action ) => {
            state.activeNote = action.payload;
            state.messageSaved = '';
        },

        setNotes: ( state, action ) => {
            state.notes = action.payload

        },

        setSaving: ( state, action ) => {
            state.isSaving = true;
            state.messageSaved = '';
        },

        updateNote: ( state, action ) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {

                if ( note.id === action.payload.id ) {
                    return action.payload;
                }

                return note;
            } );

            state.messageSaved = `${ action.payload.title }, Actualizado correctamente`;
        },

        setPhotosToActiveNote: ( state, action ) => {
            state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...action.payload];
            state.isSaving = false;
        },

        clearNotesLogout: ( state ) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.activeNote = null;
        },

        deleteNotesById: ( state, action ) => {
            state.activeNote = null;
            state.isSaving = false;
            state.notes = state.notes.filter( note => note.id !== action.payload );
        },
    }
} );

// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote,
    clearNotesLogout,
    deleteNotesById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
} = journalSlice.actions;