

import React from "react";

//----each cart item -------------------
const CartItem = ({item,  handleRemoveFromCart, handleIncreaseQuantity, handleDecreaseQuantity}) => {
    

    return(
        
        <li className="border-2 border-purple-200 shadow-lg  p-2 m-4 flex flex-col h-fit gap-2 rounded-lg">

            <img src={item.images} className="h-24 w-24 md:h-28 md:w-28 mx-auto"></img>
            <h2 className="text-center font-semibold font-sm md:text-lg  font-mono">{item.title}</h2>
            <h3 className="text-center text-green-500 font-bold text-md">$ {item.price}</h3>
            
            
            {/* -------------------buttons to chnange qunatity----------------- */}
            <div className=" flex justify-center gap-4 items-center">
                <button onClick={()=> handleIncreaseQuantity(item)} className="border border-black p-2 rounded-md font-bold text-lg ">+</button>
                <p className="border-4 p-4 rounded-md" >{item.quantity}</p>
                <button onClick={()=> handleDecreaseQuantity(item)} className="border border-black p-2 rounded-md font-bold text-lg ">-</button>
            </div>
            
            {/* -------------------remove from cart button----------------- */}
            <button className="bg-orange-500 mt-2 hover:bg-orange-400 text-white font-bold px-2 py-1 rounded-md hover:scale-y-125 duration-500" onClick={()=> handleRemoveFromCart(item)}><i className="fas fa-trash-alt mr-2"></i>Remove</button>
           
        </li>

    )
}

export default CartItem;