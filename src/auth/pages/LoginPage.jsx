import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
// import { Alert, Button, Grid2, Link, TextField, Typography } from "@mui/material";
import { Grid2} from "@mui/material";
// import { Google } from "@mui/icons-material";

import { AuthLayout } from "../layout/AuthLayout";

import { useForm } from "../../hooks/useForm";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth";

import Google  from '@mui/icons-material/Google';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';



const formData = {
  email: '',
  password: '',
}

export const LoginPage = () => {

  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector(state => state.auth) //Buscamos y tomamos elementos del estado global, store

  const {
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm(formData);



  //Si esta autenticando inhabilita los botones
  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    // console.log({ email, password })

    dispatch(startLoginWithEmailPassword(formState)); // Modifica el estado global

  }
  const onGoogleSingIn = (event) => {
    event.preventDefault();
    // console.log('onGoogleSignIn')
    dispatch(startGoogleSignIn()); // Modifica el estado global
  }


  return (
    <AuthLayout title="Iniciar sesión">
      <form onSubmit={onSubmit} aria-label="submit-form" className="animate__animated animate__fadeIn animate__faster">
        <Grid2 container spacing={2}>
          {/* Email Input */}
          <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              placeholder="correo@google.com"
              type="email"
              variant="outlined"
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid2>
          {/* Password Input */}
          <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              placeholder="Contraseña"
              variant="outlined"
              name="password"
              slotProps={{
                input: {
                  'data-testid': 'contraseña'
                }
              }}
              value={password}
              onChange={onInputChange}
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

          <Grid2 size={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isAuthenticating}
              color="secondary"
            >
              iniciar sesión
            </Button>
          </Grid2>

          <Grid2 size={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={onGoogleSingIn}
              disabled={isAuthenticating}
              aria-label="google-btn"
              color="secondary"
            >
              <Google />
              <Typography sx={{ ml: 1 }}>Google</Typography>
            </Button>
          </Grid2>


          {/* Link to Register */}
          <Grid2 container direction='row' justifyContent='end' size={12}>
            <Link component={RouterLink} color="secondary" to="/auth/register">
              Crear Cuenta
            </Link>

          </Grid2>

        </Grid2>

      </form>
    </AuthLayout>



  );
};
