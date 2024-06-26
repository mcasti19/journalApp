import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store/auth';
// import { startGoogleSignIn, startLoginWithEmail } from '../../../src/store/auth/thunks';

import { notAuthenticatedState } from '../../fixtures/authFixtures';


const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock( '../../../src/store/auth/thunks', () => ( {
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmail: ( { email, password } ) => {
        return () => mockStartLoginWithEmailPassword( { email, password } );
    }
} ) );

jest.mock( 'react-redux', () => ( {
    ...jest.requireActual( 'react-redux' ),
    useDispatch: () => ( fn ) => fn()
} ) )

const store = configureStore( {
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
} )


describe( 'Pruebas en <LoginPage/>', () => {

    beforeEach( () => jest.clearAllMocks() );

    const dispatch = jest.fn();

    test( 'Debe mostrar el componente correctamente ', () => {

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );
        // screen.debug();
        expect( screen.getAllByText( 'Login' ).length ).toBeGreaterThanOrEqual( 1 );
    } );

    test( 'Boton de Google debe llamar el startGoogleSignIn', async () => {

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // console.log( store.getState() );
        const googleBtn = screen.getByLabelText( 'google-btn' );
        // console.log( googleBtn );
        fireEvent.click( googleBtn );
        // console.log( store.getState() );

        expect( mockStartGoogleSignIn ).toHaveBeenCalled();
        // screen.debug();
    } );

    test( 'Submit debe llamar el startLoginWithEmailPassword', () => {

        const email = 'moises@moises.com';
        const password = '123456';

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );
        // screen.debug();

        const emailField = screen.getByRole( 'textbox', { name: 'Correo' } );
        fireEvent.change( emailField, { target: { name: 'email', value: email } } );

        const passwordField = screen.getByTestId( 'password' );
        fireEvent.change( passwordField, { target: { name: 'password', value: password } } );
        console.log( emailField.value, passwordField.value );

        const loginForm = screen.getByLabelText( 'submit-form' );
        fireEvent.submit( loginForm );

        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith( {
            email: email,
            password: password,
        } );
    } );
} );

//! https://www.blackbox.ai/share/03a7d052-45c7-498c-9088-26b477f40850