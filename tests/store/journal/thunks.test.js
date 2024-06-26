import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, savingNewNote, setActiveNote, startNewNote } from "../../../src/store/journal";
import { FirebaseDB } from "../../../src/firebase/config";
import { get } from "firebase/database";
import { doc } from "firebase/firestore";
//! IMPORTANTE: REGRESAR LA REGLA ORIGINAL EN LA BD: https://prnt.sc/9oaZkMOy08xC

describe( 'Pruebas en Journal Thunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test( 'startNewNote debe de crear una nueva nota en blanco', async () => {

        const uid = 'TEST-UID';
        getState.mockReturnValue( { auth: { uid: uid } } );

        await startNewNote()( dispatch, getState );

        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() );
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote( {
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number ),
            imageUrls: [],
        } ) );

        expect( dispatch ).toHaveBeenCalledWith( setActiveNote( {
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number ),
            imageUrls: [],
        } ) );

        //Borrar de Firebase
        const collectionRef = collection( FirebaseDB, `${ uid }/journal/notas` );
        const { docs } = await getDocs( collectionRef );
        // console.log( docs );

        //! PARA ELIMINAR DE FORMA RECURSIVA TENEMOS 2 FORMAS:
        // const deletePromises = [];
        // docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) );
        // await Promise.all( deletePromises );

        //! O PODEMOS HACERLO EN 1 SOLA LINEA USANDO EL .MAP Y SE VE MUCHO MAS ELEGANTE, PERO HAY QUE DESESTRUCTURAR "docs"
        await Promise.all( docs.map( ( { ref } ) => deleteDoc( ref ) ) );
    }, 6000 );

} ); 