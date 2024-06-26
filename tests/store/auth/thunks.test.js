import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmail, startLogout } from "../../../src/store/auth";
import { checkingAuthentication } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";


jest.mock( '../../../src/firebase/providers' );

describe( 'Pruebas en AuthThunks', () => {
    const dispatch = jest.fn();

    beforeEach( () => jest.clearAllMocks() )

    test( 'Debe invocar el checkingCredentianls ', async () => {

        // const valor = checkingCredentials();
        // console.log( valor );

        await checkingAuthentication()( dispatch );

        // expect( dispatch ).toHaveBeenCalledWith( { type: 'auth/checkingCredentials', payload: undefined } );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );


    } );


    test( 'startGoogleSignIn debe llamar checkingCredentials y login - Exito ', async () => {

        const loginData = { ok: true, ...demoUser }

        await signInWithGoogle.mockResolvedValue( loginData );

        //Thunk
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    } );

    test( 'startGoogleSignIn debe llamar checkingCredentials y logout - Error ', async () => {

        const loginData = { ok: false, errorMessage: 'Un error en Google.' }

        await signInWithGoogle.mockResolvedValue( loginData );

        //Thunk
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    } );


    test( 'startLoginWithEmail Debe llamar CheckingCredentianls y Login - Exito', async () => {

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123123' };

        await loginWithEmailPassword.mockResolvedValue( loginData );
        await startLoginWithEmail( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    } );

    test( 'startLoginWithEmail Debe llamar CheckingCredentianls y logout - Error', async () => {

        const loginData = { ok: false, errorMessage: 'Un error en Google.' }
        const formData = { email: demoUser.email, password: '123123' };

        await loginWithEmailPassword.mockResolvedValue( loginData );
        await startLoginWithEmail( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData ) );

    } );


    test( 'StarLogout debe llamar logutFirebase, ClearNotes y logout', async () => {

        await startLogout()( dispatch );

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );

    } );

    test( 'startCreatingUserWithEmailPassword Debe llamar CheckingCredentianls y hacer login con el usuario creado', async () => {


        const loginData = { ok: true, ...demoUser };
        console.log( loginData );
        const formData = { email: demoUser.email, password: '123123', uid: demoUser.uid };

        await registerUserWithEmailPassword.mockResolvedValue( loginData );
        await startCreatingUserWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    } );

} );