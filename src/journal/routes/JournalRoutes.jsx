import { Navigate, Route, Routes } from "react-router-dom"
import { JournalPage } from "../pages/JournalPage"


export const JournalRoutes = () => {
    return (
        <Routes>
            {/* Ruta raíz */ }
            <Route path="/" element={ <JournalPage /> } />

            {/* Cualquier otra ruta lleva a la raiz  */ }
            <Route path="/*" element={ <Navigate to="/" /> } />
        </Routes>
    )
}
