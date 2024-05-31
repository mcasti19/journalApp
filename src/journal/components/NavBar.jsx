import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Grid, IconButton, Link, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth";

export const NavBar = ( { drawerWidth } ) => {

    const dispatch = useDispatch();

    const onLogout = () => {
        // console.log( 'Saliendo' );
        dispatch( startLogout() );

    }


    return (
        <AppBar
            position="fixed"
            sx={ {
                width: { sm: `calc(100% - ${ drawerWidth }px)` },
                ml: { sm: `${ drawerWidth }px` },
            } }
        >

            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    sx={ { mr: 2, display: { sm: 'none' } } }
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant="h6" noWrap component='div'>journal App</Typography>

                    <IconButton onClick={ onLogout } color="error">

                        <LogoutOutlined />

                    </IconButton>

                </Grid>

            </Toolbar>
        </AppBar>
    )


}
