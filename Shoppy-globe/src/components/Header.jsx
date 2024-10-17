import React from "react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import '../App.css';


function Header() {
    
    // to keep track of items in cart
    const cartItems = useSelector((state)=> state.cart.cartItems);

    return(
        <nav className="bg-gray-800 text-lg p-4 flex justify-between shadow-sm shadow-gray-800">
         
          {/* ------------logo--------- */}
          <div>
            <img src='../src/assets/logo1.png' className="h-10 w-20 md:w-24 lg:w-32 rounded-xl custom-logo" alt="logo"></img>
          </div>
          

          {/* ------------navbar buttons--------- */}
          <div className="flex gap-5 items-center">

            <Link to='/cart' className="text-white hover:bg-amber-200 rounded-lg hover:text-black p-2">
              {cartItems.length > 0 && (<span className="text-black text-xl bg-yellow-100 p-1 rounded-full mr-1">{cartItems.length}</span>)}<i className="fa fa-shopping-cart "></i>
            </Link>
          
            <Link to='' className="text-white hover:bg-amber-200  rounded-lg hover:text-black p-2"><i className="fa fa-user "></i></Link>
            <Link to='/' className="text-white hover:bg-amber-200  rounded-lg hover:text-black p-2"><i className="fa fa-home "></i></Link>

          </div>

        </nav>
    )
}

export default Header;