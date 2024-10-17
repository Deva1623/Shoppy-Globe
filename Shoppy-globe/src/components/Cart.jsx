import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { removeFromCart,increaseQuantity,decreaseQuantity } from "../redux-store/cartSlice";
import '../App.css';
import CartItem from "./CartItem";
import { showToast } from "./SnackBar";

const Cart = () => {

    const cartItems = useSelector((state)=> state.cart.cartItems);   //to keep track of items in cart

    const dispatch = useDispatch();                                // to dispatch action to store

    const [isPaymentVisible, setVisible] = useState(false);        // this shows payment screen when clicked
    
    const toggleVisiblity = ()=>{
        setVisible(!isPaymentVisible);
    }

    const handleRemoveFromCart = (item)=>{                   //handles removing from cart action dispatch
        dispatch(removeFromCart(item));
        showToast('Item removed', 'info');                    
    }

    const handleIncreaseQuantity = (item)=> {               //handles increasing quantity  action dispatch
        if(item && item.id){
            dispatch(increaseQuantity(item.id))
        }else{
            console.error('Item is undefined', item);
        }
    }
    const handleDecreaseQuantity = (item)=>{                //handles increasing quantity  action dispatch
        dispatch(decreaseQuantity(item.id))
    }
    

    function showMsg(){
        showToast('Order placed Thank You', 'info');
    }

//======================================== U I ===============================================
    return(
        <section className="min-h-screen container mx-auto flex flex-col gap-2 md:flex-row ">
            
            {/*------if no items in cart--------*/}
            {cartItems.length ==0? 
            
            (<div className="flex flex-col justify-center items-center min-h-screen w-full md:w-2/3 ">
                <h2 className="text-2xl md:text-4xl mb-4 font-extrabold text-teal-800">Your cart is Empty</h2>
                <img src='../src/assets/empty1.jpg' className="md:h-96 h-56 object-contain"></img>
            </div>
            )
            :

            (<ul className="grid grid-cols-1 lg:grid-cols-2  md:w-1/2 lg:w-3/4">

                {cartItems.map((item)=> (
                
                <CartItem key={item.id} 
                  item = {item} 
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleIncreaseQuantity = {handleIncreaseQuantity}
                  handleDecreaseQuantity = {handleDecreaseQuantity}
                /> 
                ) )}
            </ul>
            )
        
            }

            
            <div className="border-4 mt-4 md:w-1/2 lg:w-1/4  w-full   rounded-lg">
              <h1 className="text-sm md:text-xl lg:text-2xl text-white p-4 bg-blue-700  rounded-lg text-center font-bold">Welcome To Your Cart</h1>
              <img src='src/assets/movingcart.gif' className=' mx-auto mt-10 h-40 w-40 md:h-56 md:w-56'></img>
            
              <div className="overflow-x-auto">

             {/* ------------items summary table--------- */}
            <table className="border-4 w-full mx-auto mt-10 text-xs md:text-sm  ">
                
                <thead>
                    <tr className="text-amber-800 text-center">
                      <th className="border px-4 py-2">Item</th>
                      <th className="border px-4 py-2">Price</th>
                      <th className="border px-4 py-2">Quantity</th>
                      <th className="border px-4 py-2">Total</th>
                    </tr>
                </thead>
               
                <tbody>
                   
                    {cartItems.map((item)=> (
                 
                    <tr key={item.id} className="text-center">
                     <td className="border px-4 py-2 ">{item.title}</td>
                     <td className="border px-4 py-2 ">${item.price}</td>
                     <td className="border px-4 py-2">{item.quantity}</td>
                     <td className="border px-4 py-2">{item.quantity*item.price}</td>
                    </tr>
                    )) 
                }
                </tbody>
                
                <tfoot>
                    <tr>
                        <td className="border px-4 py-2 font-bold text-lg" colSpan={3}>Total Amount to pay</td>
                        <td className="border px-4 py-2 font-bold text-lg text-amber-500 "> ${cartItems.reduce((acc,curr)=> acc + curr.quantity*curr.price, 0).toFixed(2)}</td>
                    </tr>
                </tfoot> 
            </table>
            
            
            <h2 className="border-4 w-full mx-auto mt-5 py-4 text-center rounded-lg font-semibold cursor-pointer hover:bg-gray-200">Apply Coupons<i className=" ml-2 fas fa-tag"></i></h2>
            

            {/* ----------------to see dummy payment screen--------------- */}
            </div>
              {cartItems.length>0 && <div className="text-center mt-10">
                <button onClick={toggleVisiblity} className=" bg-green-600 hover:bg-green-500 p-4 text-white font-bold rounded-md"><i className="fas fa-credit-card mr-2"></i>Procced to Pay</button>
              </div>}
            </div>
            
            {/*------conditionally rendering payment screen--------*/}
            {isPaymentVisible && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">

                <div className="bg-white p-8 border-8 rounded-lg shadow-lg">
                  <h1 className="text-xl font-bold mb-4 text-center">Select a Payment Option</h1>
                  
                  <div className="flex flex-col gap-4">
                    <button onClick={showMsg} className="p-4 bg-blue-500 text-white  font-bold rounded-lg mb-2"> <i className="fas fa-credit-card mr-2"></i>Credit/Debit card</button>
                    <button onClick={showMsg} className="p-4 bg-amber-500 text-white font-bold rounded-lg  mb-2"> <i className="fas fa-mobile-alt mr-2"></i>UPI</button>
                    <button  onClick={showMsg} className="p-4 bg-green-500 text-white font-bold rounded-lg  mb-2"><i className="fas fa-hand-holding-usd mr-2"></i>Cash on delivery</button>
                  </div>
                  
                  <div className="flex justify-center">
                  <button 
                    className="mt-6 p-1 bg-red-500 text-white rounded-lg w-28" onClick={toggleVisiblity} ><i className=" fas fa-close mr-2"></i>Close
                  </button>
                  </div>
                  

                </div>
              </div>
            )}

        </section>
    )
    
}

export default Cart;