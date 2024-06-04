import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from 'react-router-dom'

import { JournalApp } from './JournalApp'
import { store } from './store';
import './styles.css'

ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
  <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        {/* <HashRouter> */ }
        <JournalApp />
        {/* </HashRouter> */ }
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)


//TODO para enviar a GITHUB PAGE si no funciona con el BrowserRouter recuerda probar el  <HashRouter>