import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux-store/cartSlice';
import { showToast } from '../components/SnackBar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../App.css';

//child reciving product as props-------------------
function ProductItem({product}) {

    const dispatch = useDispatch();                                      //for dispatching action to store
    const cartItems = useSelector((state)=> state.cart.cartItems );     //getting cart items from store
    const navigate = useNavigate();                                     //for navigation


    const handleAddToCart = ()=>{
        dispatch(addToCart(product))
        showToast('Item added to cart', 'success');                    
    }

    const gotoDetailsPage = ()=>{                                        //navigation function
        
        navigate(`/product/${product.id}`);
    }
   
    //============================================ U I ==========================================================
    return (
        <section className="custom-shadow border border-black flex flex-col justify-between p-2 rounded-lg hover:scale-105 hover:shadow-blue-400 hover:shadow-lg transition-all duration-500 ease-in-out" onClick={gotoDetailsPage}>
          
          <img src={product.images} className='h-32 w-32 md:h-44 md:w-44 mx-auto' alt={product.title} />
          <h2 className='text-center font-bold text-md md:text-xl font-poppins mb-2' style={{ fontFamily: 'Poppins, sans-serif' }}>{product.title}</h2>
          <p className='text-center text-sm md:text-md mb-2 p-1' style={{ fontFamily: 'Roboto, sans-serif' }}>{product.description}</p>
          <p className='text-center text-white rounded-full font-bold mb-2 bg-teal-600 text-xs md:text-sm  w-28 mx-auto' style={{ fontFamily: 'Poppins, sans-serif' }}>{product.category}</p>
          <p className='text-center text-2xl font-bold text-blue-400 mb-2' style={{ fontFamily: 'Roboto, sans-serif' }}>${product.price}</p>
          

          {/*-------rating and availablity status-----------*/} 
          <div className='flex justify-around mb-4'>

            <h4 className="text-center text-md font-bold text-yellow-400 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
              <span className={product.rating >= 4 ? "text-green-500 font-bold" : product.rating >= 3 ? "text-yellow-500" : product.rating >= 2 ? "text-orange-500" : "text-red-500"}>
                <i className="fas fa-star text-xl"></i>{product.rating}
              </span>
            </h4>
            <h4 className='' style={{ fontFamily: 'Roboto, sans-serif' }}><i className="fas fa-check-circle text-green-500 mr-1"></i>
            {product.availabilityStatus}
            </h4>

          </div>

          {/*-------buttons on each product-----------*/} 
          <div className='flex justify-between gap-8'>
            
            <button className='bg-green-600 text-sm md:text-md w-1/2 hover:bg-blue-600 duration-500 hover:shadow-lg hover:shadow-blue-500 rounded-lg text-white p-1 font-bold' style={{ fontFamily: 'Roboto, sans-serif' }} onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}>
              <i className="fas fa-shopping-cart mr-2"></i> Add to Cart
            </button>
            <button className='bg-amber-500 hover:bg-amber-600  text-sm md:text-md w-1/2 rounded-lg text-white font-bold' style={{ fontFamily: 'Roboto, sans-serif' }}>
              <i className='fas fa-heart mr-2'></i> Add to Wishlist
            </button>

          </div>


        </section>
      );
 
}

export default ProductItem;