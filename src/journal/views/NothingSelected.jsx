import { StarOutline } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"


export const NothingSelected = () => {
    return (
        <Grid
            className="animate__animated animate__fadeIn"
            container
            spacing={ 0 }
            direction="column"
            alignContent="center"
            justifyContent="center"
            sx={ { minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main', borderRadius: 5, textAlign: 'center' } }
        >

            <Grid item xs={ 12 }>
                <StarOutline sx={ { fontSize: 100, color: 'white' } } />
            </Grid>

            <Grid item xs={ 12 }>
                <Typography color='white' variant="h5">Selecciona o crea una Nota</Typography>
            </Grid>
        </Grid>
    )
};
