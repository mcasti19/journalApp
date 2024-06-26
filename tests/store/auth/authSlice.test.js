import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures";

//! https://redux.js.org/usage/writing-tests  CONSULTAR PARA MEJORAR TEST USANDO REDUX

describe( 'Pruebas en el AuthSlice', () => {


    test( 'Debe mostrar el nombre y el estado inicial ', () => {

        // console.log( authSlice );
        const state = authSlice.reducer( initialState, {} );
        // console.log( state );

        expect( authSlice.name ).toBe( 'auth' );
        expect( state ).toEqual( initialState );
    } );

    test( 'Debe realizar la autenticación ', () => {

        // console.log( login( demoUser ) ); !//! Se imprime la funcion generadora Login y se le pasa el payload que es el demoUser

        // const state1 = authSlice.reducer( initialState, {} );
        // console.log( "InicialState: ", state1 );

        const state = authSlice.reducer( initialState, login( demoUser ) );
        // console.log( "Authenticated: ", state );

        expect( state ).toEqual( {
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        } );
    } );


    test( 'Debe hacer el logout sin argumentos', () => {

        // console.log( logout( notAuthenticatedState ) );
        const state = authSlice.reducer( authenticatedState, logout() );
        expect( state ).toEqual( {
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined,
        } );
    } );


    test( 'Debe hacer el logout y mostrar mensaje de error', () => {

        const errorMessage = 'Credenciales incorrectas';
        // console.log( logout( notAuthenticatedState ) );


        const state = authSlice.reducer( authenticatedState, logout( { errorMessage } ) );

        expect( state ).toEqual( {
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage,
        } );

        console.log( errorMessage );
    } );


    test( 'Debe cambiar el status a Checking', () => {

        const state = authSlice.reducer( authenticatedState, checkingCredentials() );

        // console.log( state.status );
        expect( state.status ).toBe( 'checking' );
    } );
} );