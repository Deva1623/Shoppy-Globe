
import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './cartSlice'



export const store = configureStore({

    reducer:{
        cart:cartReducer       //regestering the cart reducer in store
    }
})

