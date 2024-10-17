
import { createSlice } from "@reduxjs/toolkit";



const cartSlice = createSlice({


    name:'cart',
    initialState: {
        cartItems: [],                 
    },

    reducers: {

        addToCart: (state, action)=>{             //method to add to cart
            
            const myItem = state.cartItems.find((item)=>item.id === action.payload.id);
            if(myItem){
               myItem.quantity++;
            }else{
                state.cartItems.push({...action.payload, quantity:1});
            }
        },

        removeFromCart: (state, action)=>{      //method to remove from cart

            state.cartItems = state.cartItems.filter( (item)=> item.id !== action.payload.id  );
        },

        increaseQuantity: (state,action)=>{
            const myItem = state.cartItems.find((item)=>item.id === action.payload);
            console.log('myitem in slice', myItem)
            if(myItem){
                myItem.quantity++;
            }
        },

        decreaseQuantity: (state, action)=>{
            const myItem = state.cartItems.find((item)=>item.id === action.payload);
            if(myItem && myItem.quantity >0){
                myItem.quantity--;
            }
        }
    }
})

export const {addToCart, removeFromCart, increaseQuantity, decreaseQuantity} = cartSlice.actions;
export default cartSlice.reducer;