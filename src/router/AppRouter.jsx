import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui/components';


import { useCheckAuth } from '../hooks';


export const AppRouter = () => {

    // const { status } = useSelector( state => state.auth );

    // const dispatch = useDispatch();


    // useEffect( () => {
    //     onAuthStateChanged( FirebaseAuth, async ( user ) => {  // console.log( user );
    //         if ( !user ) return dispatch( logout() );

    //         const { uid, email, displayName, photoURL } = user;
    //         dispatch( login( { uid, email, displayName, photoURL } ) );
    //     } )

    // }, [] )

    const { status } = useCheckAuth();

    if ( status === 'checking' ) {
        return <CheckingAuth />
    }

    return (
        <Routes>

            {
                ( status === 'authenticated' )
                    ? <Route path="/*" element={ <JournalRoutes /> } />
                    : <Route path="/auth/*" element={ <AuthRoutes /> } />
            }

            <Route path='/*' element={ <Navigate to='/auth/login' /> } />


            {/* Login y Registro */ }
            {/* <Route path="/auth/*" element={ <AuthRoutes /> } /> */ }


            {/* Journal App */ }
            {/* <Route path="/*" element={ <JournalRoutes /> } /> */ }

        </Routes>
    )


}
