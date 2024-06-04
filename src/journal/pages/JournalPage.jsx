
import { useDispatch, useSelector } from "react-redux"

import { IconButton } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"

import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelected } from "../views"
import { startNewNote } from "../../store/journal"


export const JournalPage = () => {

    const dispatch = useDispatch();
    const { isSaving, activeNote } = useSelector( state => state.journal );
    // console.log( active );

    const onClickNewNote = () => {
        dispatch( startNewNote() );
    }

    return (
        <JournalLayout>


            {
                ( !activeNote )
                    ? <NothingSelected />
                    : <NoteView />
            }
 

            <IconButton
                onClick={ onClickNewNote }
                size="large"
                sx={ {
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': {
                        backgroundColor: 'error.main',
                        opacity: 0.5
                    },
                    position: 'fixed',
                    right: 50,
                    bottom: 50,
                } }
                disabled={ isSaving }
            >

                <AddOutlined sx={ { fontSize: 30 } } />
            </IconButton>



        </JournalLayout>
    )
}
