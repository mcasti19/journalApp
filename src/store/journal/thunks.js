import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
    addNewEmptyNote,
    deleteNotesById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving, updateNote
} from "./";
import { fileUpload, loadNotes } from "../../helpers";


export const startNewNote = () => {
    return async ( dispatch, getState ) => {

        dispatch( savingNewNote() );
        // console.log( getState() );

        const { uid } = getState().auth;     // console.log( uid );

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: [],
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notas` ) );
        const setDocResp = await setDoc( newDoc, newNote );   // console.log( { newDoc, setDocResp } );

        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );

    }
}

export const startLoadingNotes = () => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;
        if ( !uid ) throw new Error( 'El UID de usuario no existe' ); // console.log( { uid } );

        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) )
    }
}

export const startSavingNote = () => {
    return async ( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { activeNote } = getState().journal;
        const noteToFirestore = { ...activeNote };
        //! CON EL DELETE SOLAMENTE ELIMINAMOS LA PROPIEDAD (id) DEL OBJETO ESPARCIDO ARRIBA, ES DECIR EL ...note
        //! SE ELIMINA LA PROPIEDAD "id" PORQUE YA VA INCLUIDA EN LA NOTA ACTIVA Y YA SE ENCUENTRA EN FIREBASE Y NO SE QUIERE REEMPLAZAR
        //!  https://prnt.sc/as4Wq1Djofmt

        delete noteToFirestore.id;  // console.log( noteToFirestore );

        const docRef = doc( FirebaseDB, `${ uid }/journal/notas/${ activeNote.id }` );  // console.log( docRef );

        const docRefResp = await setDoc( docRef, noteToFirestore, { merge: true } );
        console.log( docRefResp );

        dispatch( updateNote( activeNote ) )
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async ( dispatch, getState ) => {
        dispatch( setSaving() );
        // console.log( files );

        // await fileUpload( files[0] ); //! Esta accion envia SOLO 1 archivo aunque selecciones varios

        //! Para poder disparar la subida de varios archivos de forma simultanea y no en secuencia se haria asi:

        const fileUploadPromises = [];
        for ( const file of files ) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        // console.log( photosUrls );

        dispatch( setPhotosToActiveNote( photosUrls ) );
    }
}

export const StartDeleteNote = () => {
    return async ( dispatch, getState ) => {
        // console.log( id );
        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { activeNote } = getState().journal;
        const docRef = doc( FirebaseDB, `${ uid }/journal/notas/${ activeNote.id }` );
        console.log( docRef );

        await deleteDoc( docRef );
        dispatch( deleteNotesById( activeNote.id ) );

    }
}