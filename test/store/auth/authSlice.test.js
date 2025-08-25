import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Pruebas en el authSlice', () => {
    test('Debe regresar el estado inicial y llamarse auth', () => {
        const state = authSlice.reducer(initialState, {})

        expect(authSlice.name).toBe('auth')
        expect(state).toEqual(initialState)
    });

    test('Debe de realizar la autenticacion', () => {

        const state = authSlice.reducer(initialState, login(demoUser));


        expect(state).toEqual({
            status: 'authenticated', //'checking', 'authenticated
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        })
    });

    test('Debe de regresar el logout sin argumentos', () => {

        const state = authSlice.reducer(authenticatedState, logout())
        // console.log(state)

        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        })

    });

    test('Debe realizar el logout y mostrar un mensaje de error', () => {
        const errorMessage = 'Las credenciales no son correctas'
        const state = authSlice.reducer(authenticatedState, logout({ errorMessage }))
        // console.log(state)

        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        })
    });

    test('Debe de cambiar el estado a checking', () => { 
        
        const state = authSlice.reducer(authenticatedState, checkingCredentials())
        // console.log(state.status)
        expect(state.status).toEqual('checking')
     })

});


