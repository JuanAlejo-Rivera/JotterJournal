import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { chekingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers')


describe('Pruebas en el AuthThunks', () => {

    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks())

    test('Debe de invocar el checkin credential', async () => {

        await chekingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())


    });

    test('startGoogleSignIn, Debe de llamar checkingCredentials y login - exito', async () => {

        const loginData = { ok: true, ...demoUser }
        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))

    });

    test('startGoogleSignIn, Debe de llamar checkingCredentials y logout - error', async () => {

        const loginData = { ok: false, errorMessage: 'un error en google' }
        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))

    });

    test('startCreatingUserWithEmailPassword, debe llamar checkingCredentials y login - exito', async() => {

        const loginData = { ok: true, ...demoUser }
        const formData = { email: demoUser.email, password: '123456', displayName:demoUser.displayName }

        await registerUserWithEmailPassword.mockResolvedValue(loginData)

        await startCreatingUserWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(demoUser))
    })

    test('startCreatingUserWithEmailPassword, debe llamar checkingCredentials y logout - error', async() => {

        const loginData = { ok: false, errorMessage: 'Este correo ya se encuentra registrado.' }
        const formData = { email: demoUser.email, password: '123456', displayName:demoUser.displayName }
// console.log(loginData.errorMessage)

        await registerUserWithEmailPassword.mockResolvedValue(loginData)
        await startCreatingUserWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(logout({errorMessage:loginData.errorMessage}))

    })


    test('startLoginWithEmailPassword, debe de llamar checking credentials y login - exito', async () => {

        const loginData = { ok: true, ...demoUser }
        const formData = { email: demoUser.email, password: '123456' }

        await loginWithEmailPassword.mockResolvedValue(loginData)

        await startLoginWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
        // console.log(login(loginData))

    });

    test('startLoginWithEmailPassword, debe de llamar checking credentials y logout - error', async() => {
        const loginData = { ok: false, errorMessage: 'error al inglresar correo o contraseña' }
        const formData = { email: demoUser.email, password: '123456' }

        await loginWithEmailPassword.mockResolvedValue(loginData);
        
        await startLoginWithEmailPassword(formData)(dispatch)
        // console.log('Llamadas al mock de loginWithEmailPassword:', loginWithEmailPassword.mock.calls);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData))
            /* Se realiza una simulacion del retorno de  loginWithEmailPassword
            este resultado se retorna al ejecutar startLoginWithEmailPassword
            lo que hace que al llamar el logout con el loginData lo valores de error coincidan
            */
    })


    test('startLogout, debe de llamar logout fireBase, clearNotes y logout', async () => {

        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());

    })


});