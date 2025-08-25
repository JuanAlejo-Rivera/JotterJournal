import { useMemo, useState } from "react";
import { Alert, Button, Grid2, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener una @'],
  password: [(value) => value.length >= 6, 'La contraseña debe tener mas de 6 letras'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio']
}

export const RegisterPage = () => {

  const dispatch = useDispatch()
  const [formSumitted, setFormSumitted] = useState(false)

// Extrae el estado de autenticación del store global usando useSelector.
// 'status' indica el estado actual del proceso de autenticación (e.g., 'checking', 'authenticated', 'not-authenticated').
// 'errorMessage' contiene cualquier mensaje de error relacionado con la autenticación.
const { status, errorMessage } = useSelector(state => state.auth);

// Memoriza el valor de 'isCheckingAuthentication' para optimizar el rendimiento.
// Devuelve 'true' si el estado actual ('status') es 'checking', lo que significa que la autenticación está en curso.
// Esto evita cálculos innecesarios en cada renderizado si 'status' no cambia.
const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const {
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm(formData, formValidations);


  const onSubmit = (event) => {
    event.preventDefault()
    setFormSumitted(true)

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState))
  }

  return (
    <AuthLayout title="Crear cuenta">
      {/* <h1>FormValid {isFormValid ? 'Valido' : 'invalido'}</h1> */}
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid2 container spacing={2}>
          {/* Name Input */}
          <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Nombre completo"
              placeholder="Nombre completo"
              type="text"
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSumitted}
              helperText={displayNameValid}
            />
          </Grid2>
          {/* Email Input */}
          <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              id="email"
              label="Correo"
              placeholder="correo@google.com"
              type="text"
              variant="outlined"
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSumitted}
              helperText={emailValid}
            />
          </Grid2>
          {/* Password Input */}
          <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              variant="outlined"
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSumitted}
              helperText={passwordValid}
            />
          </Grid2>
        </Grid2>



        {/* Buttons */}
        <Grid2 container spacing={2} sx={{ mb: 2, mt: 3 }}>

          <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} 
          display={!!errorMessage ? '' : 'none'}
          >
            <Alert severity="error">{errorMessage}</Alert>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
            <Button
              disabled={isCheckingAuthentication} //El boton se inhabilita cuando esta el estado checking
              variant="contained"
              fullWidth
              type="submit"
              color="secondary"
            >
              Crear cuenta
            </Button>
          </Grid2>


          {/* Link to Register */}
          <Grid2 container direction='row' justifyContent='end' size={12}>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color="secondary" to="/auth/login">
              Ingresar
            </Link>

          </Grid2>

        </Grid2>

      </form>
    </AuthLayout>



  );
};
