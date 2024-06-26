//! Este archivo lo usamos para crear diferentes estados que luego seran usados para las pruebas que lo necesiten

export const initialState = {
    status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authenticatedState = {
    status: 'authenticated',
    uid: '123ABC',
    email: 'correo@correo.com',
    displayName: 'Moises',
    photoURL: 'https://demo.jpg',
    errorMessage: null,
}

export const notAuthenticatedState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const demoUser = {
    uid: 'ABC123',
    email: 'demo@demo.com',
    displayName: 'Demo User',
    photoURL: 'https://demo.jpg',
}