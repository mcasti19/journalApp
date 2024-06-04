import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { login, logout } from '../store/auth';
import { FirebaseAuth } from '../firebase/config';
import { startLoadingNotes } from '../store/journal';

export const useCheckAuth = () => {

    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();


    useEffect( () => {
        onAuthStateChanged( FirebaseAuth, async ( user ) => {  // console.log( user );
            if ( !user ) return dispatch( logout() );

            const { uid, email, displayName, photoURL } = user;
            dispatch( login( { uid, email, displayName, photoURL } ) );
            dispatch( startLoadingNotes() );
        } )

    }, [] );

    return { status }

}
