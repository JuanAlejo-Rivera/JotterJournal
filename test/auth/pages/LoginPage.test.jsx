import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "../../../src/store/auth";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { notAuthenticatedState } from "../../fixtures/authFixtures";


const mockStartGoogleSingIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks',() =>({
    startGoogleSignIn:() => mockStartGoogleSingIn,
    startLoginWithEmailPassword:({email, password}) => {
        return () => mockStartLoginWithEmailPassword({email,password})
    },
}))

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn()  // Ejecuta la función que se le pasa
}));


const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    //Se establece el estado inciial en no autenticado, para la prueba del boton de google
    //ya que auth: authSlice.reducer establece el initial estate que esta en checking
    preloadedState:{
        auth: notAuthenticatedState
    }
})


describe("Pruebas en el LoginPage", () => {

    beforeAll(() =>jest.clearAllMocks())

    test("Debe de mostrar el componente correctamente", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        // screen.debug();
        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)
    });

    test('Prueba boton de google, debe llamar startGoogleSingIn', () => { 
        
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click(googleBtn)
        
        expect(mockStartGoogleSingIn).toHaveBeenCalled()

     });

     test('submit debe de llamar startLoadingWithEmailPassword', () => { 

        const email = 'juan@hola.com';
        const password = '123456';

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox',{name:'Email'});
        fireEvent.change(emailField, {target:{name:'email', value:email}})
        
        const passwordField = screen.getByTestId('contraseña').querySelector('input'); //  Buscar el <input> dentro del <div>
        fireEvent.change(passwordField, { target: { value: password } });

        const loginForm= screen.getByLabelText('submit-form');
        fireEvent.submit(loginForm)

        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
            email,
            password
        })

      });
});
