import { useMemo } from "react";
import { useDispatch } from "react-redux";
import {
    Grid,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material"

import { Delete, DeleteOutline, TurnedInNot } from "@mui/icons-material"
import { StartDeleteNote, setActiveNote } from "../../store/journal";

export const SideBarItem = ( { title = '', id, body, date, imageUrls = [] } ) => {

    const dispatch = useDispatch();
    // console.log( { id, title, body, date } );

    const newTitle = useMemo( () => {
        return title.length > 17
            ? title.substring( 0, 17 ) + '...'
            : title

    }, [title] );

    const onClickgNote = () => {
        // console.log( 'Selectin Note:', { title, id, body, date } );
        dispatch( setActiveNote( { id, title, body, imageUrls, date } ) );
    }

    // const onDeleteNote = () => {
    //     // console.log( 'Eliminando nota' );
    //     dispatch( StartDeleteNote( id ) );
    // }

    return (
        <ListItem disablePadding onClick={ onClickgNote }>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    {/* <ListItemText secondary={ date } /> */ }
                    <ListItemText primary={ newTitle } />
                    {/* <IconButton onClick={ onDeleteNote }>
                        <DeleteOutline />
                    </IconButton> */}
                    <ListItemText secondary={ body } />
                </Grid>
            </ListItemButton>
        </ListItem>

    )
}
