import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Facebook, GitHub, Google, Password, X } from "@mui/icons-material";
import { Button, Grid, TextField, Typography, Link, Alert } from "@mui/material";

import { useForm } from "../../hooks/useForm";
import { AuthLayout } from "../layout/AuthLayout";
import { startGitHubSignIn, startGoogleSignIn, startLoginWithEmail } from "../../store/auth";


const formData = {
    email: '',
    password: '',
}

export const LoginPage = () => {
    const dispatch = useDispatch();

    const { status, errorMessage } = useSelector( state => state.auth ); // console.log( status );

    const isAuthenticated = useMemo( () => status === 'checking', [status] );

    const { email, password, onInputChange, formState } = useForm( formData );


    const onSubmit = ( event ) => {
        event.preventDefault();
        dispatch( startLoginWithEmail( formState ) );
    }

    const onGoogleSingIn = () => {
        console.log( 'OnGoogleSingIn' );
        dispatch( startGoogleSignIn() )
    }

    const onGitHubSingIn = () => {
        console.log( 'OnGitHubSingIn' );
        dispatch( startGitHubSignIn() )
    }


    return (
        <AuthLayout title="Login">

            <form action="" onSubmit={ onSubmit } className="animate__animated animate__fadeIn ">
                <Grid container>

                    <Grid item xs={ 12 } sx={ { mt: 2 } }>
                        <TextField
                            label="Correo"
                            type="email"
                            placeholder="correo@google.com"
                            fullWidth
                            name="email"
                            value={ email }
                            onChange={ onInputChange }
                            required

                        />
                    </Grid>

                    <Grid item xs={ 12 } sx={ { mt: 2 } } >
                        <TextField
                            label="Contraseña"
                            type="password"
                            placeholder="tu contraseña"
                            fullWidth
                            name="password"
                            value={ password }
                            onChange={ onInputChange }

                        />
                    </Grid>

                    <Grid container spacing={ 2 } sx={ { mt: 1 } } >


                        <Grid item xs={ 12 } sx={ { m: 'auto' } } display={ !!errorMessage ? 'block' : 'none' }>
                            <Alert severity="error">{ errorMessage }</Alert>
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 } >
                            {/* <Link component={ RouterLink } color='inherit' to="/"> */ }
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={ isAuthenticated }

                            >
                                Login
                            </Button>
                            {/* </Link> */ }
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button
                                onClick={ onGoogleSingIn }
                                variant="contained"
                                fullWidth
                                disabled={ isAuthenticated }
                            >
                                <Google />
                                <Typography sx={ { ml: 1 } }>Google</Typography>
                            </Button>
                        </Grid>


                        <Grid item xs={ 12 } >
                            <Button
                                // onClick={ onGitHubSingIn }
                                variant="contained"
                                fullWidth
                                disabled={ isAuthenticated }
                                sx={ { backgroundColor: 'black' } }
                            >
                                <GitHub />
                                <Typography sx={ { ml: 1 } }>Github</Typography>
                            </Button>
                        </Grid>

                        <Grid item xs={ 12 } >
                            <Button
                                // onClick={ onTwitterSingIn }
                                variant="contained"
                                fullWidth
                                disabled={ isAuthenticated }
                                sx={ { backgroundColor: 'black' } }
                            >
                                <X />
                                {/* <Typography sx={ { ml: 1 } }></Typography> */ }
                            </Button>
                        </Grid>

                        <Grid item xs={ 12 } >
                            <Button
                                // onClick={ onMetaSingIn }
                                variant="contained"
                                fullWidth
                                disabled={ isAuthenticated }
                            >
                                <Facebook />
                                <Typography sx={ { ml: 1 } }>FaceBook</Typography>
                            </Button>
                        </Grid>

                    </Grid>

                    <Grid container direction='row' justifyContent='end' sx={ { mt: 1 } }>
                        <Link component={ RouterLink } color='inherit' to="/auth/register">
                            Crear una cuenta
                        </Link>
                    </Grid>

                </Grid>
            </form>

        </AuthLayout >
    )
};
