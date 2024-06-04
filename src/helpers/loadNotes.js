import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";



export const loadNotes = async ( uid = '' ) => {
    if ( !uid ) throw new Error( 'El UID de usuario no existe' );

    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notas` );
    // console.log( collectionRef );

    const docs = await getDocs( collectionRef );
    // console.log( docs.data() ); //! Aqui ya tengo el los ID de cada nota


    const notes = [];
    docs.forEach( doc => {
        // console.log( doc.data() );
        notes.push( { id: doc.id, ...doc.data() } );
    } );

    // console.log( notes );
    return notes;

}
