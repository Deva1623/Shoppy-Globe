import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import {store} from './redux-store/store.js'
import Snackbar from './components/SnackBar.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './redux-store/appRouter';

createRoot(document.getElementById('root')).render(

  <StrictMode>

    <Provider store={store}>                   {/*---provinding redux store to entire App--*/}
     
    <RouterProvider router={router}>
        <App />
    </RouterProvider>
     
     
    <Snackbar />
    
    </Provider>

  </StrictMode>,
)
