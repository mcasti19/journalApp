import { useSelector } from "react-redux";
import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material"
import { SideBarItem } from "./SideBarItem";


// const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
export const SideBar = ( { drawerWidth = 240 } ) => {

    const { notes = [] } = useSelector( state => state.journal );  // console.log( notes );

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
                        notes.map( note => (
                            <SideBarItem key={ note.id } { ...note } />
                        ) )
                    }
                </List>

            </Drawer>

        </Box>

    )

}
