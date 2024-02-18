import React from 'react'
import ReactDOM from 'react-dom/client'
import 'react-calendar/dist/Calendar.css';
import './app/layout/style.css'
import 'semantic-ui-css/semantic.min.css'
import App from './app/layout/App'
import { StoreContext, store } from './app/stores/store'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
    <RouterProvider router={router}/>
    </StoreContext.Provider>
  </React.StrictMode>,
)
