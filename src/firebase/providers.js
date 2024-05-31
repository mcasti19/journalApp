import {
    FacebookAuthProvider,
    GithubAuthProvider,
    GoogleAuthProvider,
    TwitterAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";

import { FirebaseAuth } from "./config";

const twitterProvider = new TwitterAuthProvider()
const facebookProvider = new FacebookAuthProvider();


const githubProvider = new GithubAuthProvider();
export const signInWithGitHub = async () => {

    try {
        const result = await signInWithPopup( FirebaseAuth, githubProvider )
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }

    } catch ( error ) {
        // console.log( error.message );
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            //Info del Error
            errorMessage
        }
    }
}



const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters( { prompt: 'select_account' } )

export const signInWithGoogle = async () => {

    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider )
        // const credentials = GoogleAuthProvider.credentialFromResult( result )
        // console.log( { credentials } );
        // const user = result.user;  // console.log( user );

        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            //User info
            displayName,
            email,
            photoURL,
            uid
        }

    } catch ( error ) {
        console.log( error );

        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            //Info del Error
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async ( { email, password, displayName } ) => {

    try {
        // console.log( email, password, displayName );
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;
        // console.log( resp );

        //TODO actualizar en firebase el displayName
        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch ( error ) {
        // console.log( 'Este es el Error', error.message );
        switch ( error.message ) {
            case "Firebase: Error (auth/email-already-in-use).":

                error.message = 'El usuario ya existe';
                break;

            case "Firebase: Error (auth/invalid-email).":

                error.message = 'Verifique, el correo no es valido';
                break;

            default:
                console.log( 'Lo sentimos, verifique sus datos e intente nuevamente' );
        }

        return { ok: false, errorMessage: error.message }
    }
}

export const loginWithEmailPassword = async ( { email, password } ) => {

    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;
        // console.log( 'ESTO REGRESA LA NUEVA FUNCION: ', resp );

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch ( error ) {

        if ( error.message === 'Firebase: Error (auth/invalid-credential).' ) {
            error.message = 'Usuario y/o Contraseña invalida.'
        }

        return { ok: false, errorMessage: error.message }
    }
};

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}