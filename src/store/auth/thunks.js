import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGitHub, signInWithGoogle } from '../../firebase/providers';
import { checkingCredentials, logout, login } from './';

export const checkingAuthentication = () => {
    return async ( dispatch ) => {

        dispatch( checkingCredentials() );

    }
}

export const startGitHubSignIn = () => {
    return async ( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await signInWithGitHub();
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ) )

    }
}



export const startGoogleSignIn = () => {
    return async ( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ) )

    }
}

export const startCreatingUserWithEmailPassword = ( { email, password, displayName } ) => {
    return async ( dispatch ) => {

        dispatch( checkingCredentials() );

        // const result = await registerUserWithEmailPassword({ email, password, displayName });
        const { ok, uid, errorMessage } = await registerUserWithEmailPassword( { email, password, displayName } );
        if ( !ok ) return dispatch( logout( { errorMessage } ) );

        // dispatch( login( result ) );
        dispatch( login( { uid, displayName, email } ) );

    }
}

export const startLoginWithEmail = ( { email, password } ) => {

    return async ( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await loginWithEmailPassword( { email, password } );
        // console.log( 'RESULTTTTTT:', result );
        // const { ok, uid, displayName, photoURL, errorMessage } = result;

        if ( !result.ok ) return dispatch( logout( result ) );

        dispatch( login( result ) );
    }
};

export const startLogout = () => {
    return async ( dispatch ) => {
        await logoutFirebase();

        dispatch( logout() );
    }
}
