
import { IconButton, Typography } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"

import { JournalLayout } from "../layout/JournalLayout"
import { NotView, NothingSelected } from "../views"


export const JournalPage = () => {
    return (
        <JournalLayout>

            {/* <NothingSelected />  */ }
            <NotView />

            <IconButton
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
            >

                <AddOutlined sx={ { fontSize: 30 } } />
            </IconButton>



        </JournalLayout>
    )
}
