import { TurnedInNot, TurnedInOutlined } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux";


const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
export const SideBar = ( { drawerWidth = 240 } ) => {

    const { displayName } = useSelector( state => state.auth )

    return (
        <Box
            component='nav'
            sx={ { width: { sm: drawerWidth }, flexShrink: { sm: 0 } } }
        >


            <Drawer
                variant='permanent'
                open
                sx={ {
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                } }
            >

                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        { displayName }
                    </Typography>
                </Toolbar>

                <Divider />

                <List>
                    {
                        meses.map( mes => (
                            <ListItem key={ mes } disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TurnedInNot />
                                    </ListItemIcon>
                                    <Grid container>
                                        <ListItemText primary={ mes } />
                                        <ListItemText secondary={ 'Loren Insert Line, Loren Insert Line' } />
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                        ) )
                    }
                </List>


            </Drawer>

        </Box>




    )




}
