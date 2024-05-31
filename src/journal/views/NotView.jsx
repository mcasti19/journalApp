import { SavedSearchOutlined, SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";


export const NotView = () => {

    return (

        <Grid
            className="animate__animated animate__fadeIn"
            container
            direction='row'
            justifyContent='space-between'
            sx={ { mb: 1 } }
        >

            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light' >
                    26 Diciembre 1987
                </Typography>

            </Grid>

            <Grid item>
                <Button color='primary' sx={ { padding: 2 } } >
                    <SaveOutlined sx={ { fontSize: 30, mr: 1 } } />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese Titulo"
                    label='Titulo'
                    sx={ { border: 'none', mb: 1 } }
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Que sucedió el dia de hoy"
                    minRows={ 3 }

                />
            </Grid>

            {/* Galeria de Imagenes */ }
            <ImageGallery />



        </Grid>




    )
};
