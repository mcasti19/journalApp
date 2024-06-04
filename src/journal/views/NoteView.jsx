import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DeleteOutline, SaveOutlined, UploadFileOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
// import 'sweetalert2/dist/sweetalert2.css'; //! ASI LO IMPORTO FERNANDO EN EL CURSO

import { ImageGallery } from "../components";
import { useForm } from "../../hooks/useForm";
import { StartDeleteNote, setActiveNote, startSavingNote, startUploadingFiles } from "../../store/journal";


export const NoteView = () => {

    // const { active } = useSelector( state => state.journal );
    // const { title, body, formState, onInputChange } = useForm( {
    //     title: active.title,
    //     body: active.body,
    // } ); 


    const dispatch = useDispatch();

    const { activeNote, isSaving, messageSaved } = useSelector( state => state.journal );
    const { imageUrls } = activeNote;
    // console.log( activeNote.imageUrls );
    const { title, body, date, formState, onInputChange } = useForm( activeNote );

    const dateString = useMemo( () => {
        const newdate = new Date( date ).toUTCString();
        return newdate
    }, [date] );


    const fileInputRef = useRef();


    useEffect( () => {
        dispatch( setActiveNote( formState ) )
    }, [formState] )


    useEffect( () => {
        if ( messageSaved.length > 0 ) {

            // Swal.fire( 'Nota actualizada', messageSaved, 'success' ); //! ASI LO HIZO FERNANDO EN EL CURSO; PERO ME GUSTA MAS ASI:
            Swal.fire( {
                title: 'Excelente',
                text: messageSaved,
                icon: 'success',
                confirmButtonText: 'Continuar'
            } )
        }

    }, [messageSaved] )


    const onSaveNote = () => {
        // dispatch( startSavingNote( id ) );
        dispatch( startSavingNote() );
    }

    const OnFileInputChange = ( { target } ) => {
        //! El target se esta desestructurando del objeto "event" y a su vez se toma la propiedad "file" del mismo target
        // console.log( event );
        // console.log( target.files );

        if ( target.files === 0 ) return;
        // console.log( 'Subiendo archivos' );
        dispatch( startUploadingFiles( target.files ) );
    }

    const onDeleteNote = () => {
        // console.log( 'Eliminando nota' );
        dispatch( StartDeleteNote() );
    }



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
                    { dateString }
                </Typography>

            </Grid>

            <Grid item>

                <input
                    type="file"
                    multiple
                    ref={ fileInputRef }
                    onChange={ OnFileInputChange }
                    style={ { display: 'none' } }
                />
                <IconButton
                    color="primary"
                    disabled={ isSaving }
                    onClick={ () => fileInputRef.current.click() }
                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    onClick={ onSaveNote }
                    color='primary'
                    sx={ { padding: 2 } }
                    disabled={ isSaving }

                >
                    <SaveOutlined sx={ { fontSize: 30, mr: 1 } } />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    sx={ { border: 'none', mb: 1 } }
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese Titulo"
                    label='Titulo'
                    name='title'
                    value={ title }
                    onChange={ onInputChange }
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Que sucedió el dia de hoy"
                    name='body'
                    value={ body }
                    onChange={ onInputChange }
                    minRows={ 5 }

                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={ onDeleteNote }
                    sx={ { mt: 2 } }>
                    <DeleteOutline />
                </Button>
            </Grid>

            {/* Galeria de Imagenes */ }
            <ImageGallery images={ imageUrls } />



        </Grid>




    )
};
