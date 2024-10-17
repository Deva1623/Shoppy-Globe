import React from "react";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import '../App.css';
import { Link } from "react-router-dom";
import { showToast } from "./SnackBar";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux-store/cartSlice";
import { useNavigate } from "react-router-dom";
//----component for showing detail of clicked item

function ProductDetail() {
    
    const {id} = useParams();                                       //to get id of clicked item
    const [clickedProduct , setClicked] = useState(null);           // to store clicked item
    const [loading, setLoading] = useState(true);                   // to show loader
    const [error, setError] = useState(null);                       // for error messges
    
    const dispatch = useDispatch();                                 //for dispatching actions to store
    
    const navigate = useNavigate();
    //------------fecthing particular product with ID--------------
    useEffect(()=>{
    
        const fetchItem = async ()=>{
            setLoading(true);                              //intially loader will come
          
            try{

                const response = await fetch(`https://dummyjson.com/products/${id}`)
                
                if (!response.ok) {
                    throw new Error('Product not found');
                }

                const data = await response.json();
                setClicked(data);
            }
            catch(e){
                if(e.message === 'Product not found'){navigate('/notfound')

                }else{
                    showToast('Something went wrong', 'error');
                } 
            }
            finally{
                setLoading(false);
            }
        }

        fetchItem();
    }, [id])                                                  //fetching item details of that particular id
    

    const handleAddToCart=()=>{
        dispatch(addToCart(clickedProduct));
        showToast('Product added to cart', 'success');         // dispatch add to cart action to store

    }

    if(loading){return (
        <div className="flex flex-col justify-center items-center mt-44 text-xl gap-10">
           Loading Please wait... <div className="loader"></div> 
        </div>
    )} 
 
    //================================================U I================================================================   
    return (
        
        <section className="container mx-auto  min-h-screen mt-44">
            
            {/* --------------clicked product details------------- */}
            {clickedProduct  && (
                
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           
                <div className="border-2 hover:scale-105 duration-500 hover:shadow-amber-400 border-gray-200 shadow-lg  mx-auto">
                    <img className=" h-64 w-64 md:h-96 md:w-96 rounded-xl" src={clickedProduct.images}></img>
                </div>

                <div className="border border-black rounded-lg p-5 flex flex-col justify-between md:mr-10">
                    <h2 className="text-center underline font-bold text-2xl color mb-4">{clickedProduct.title}</h2>
                    <span className="bg-amber-100 rounded-full text-center mb-2">{clickedProduct.brand}</span>
                    <span className="text-center mb-2 text-pink-600 font-semibold">{clickedProduct.category}</span>
                    <h1 className="text-center text-green-600 font-bold text-lg mb-4">Price: ${clickedProduct.price}</h1>
                   
                    <div className="flex  gap-2 mb-4">
                        <button className="bg-green-500 hover:bg-green-400 hover:-translate-y-2 duration-200 p-2 w-full text-white font-bold text-sm rounded-md"><i className="fas fa-heart mr-2"></i>Add to Favourites</button>
                        <Link to='/' className="bg-teal-500  hover:bg-teal-400 hover:-translate-y-2 duration-200 p-2 w-full text-white font-bold text-sm rounded-md flex justify-center items-center"><i className="fas fa-home mr-2"></i>Home</Link>
                    </div>
                    <p className="" >{clickedProduct.description}</p>
                   
                    <div className="flex justify-start gap-5 mt-4">
                        <h2><i className="fas fa-star text-yellow-500" ></i> {clickedProduct.rating}</h2>
                        <h2><i className="fas fa-check-circle text-green-500"> </i> In-Stock: {clickedProduct.stock}</h2>
                        <h2><i className="fas fa-arrow-left mr-1 text-blue-800"></i>{clickedProduct.returnPolicy}</h2>
                        <button onClick={handleAddToCart} className="bg-amber-800 hover:bg-amber-600 text-white p-1 rounded-md text-xs font-bold"><i className="fas fa-shopping-cart mr-1"></i>Add to cart</button>
                    </div> 
                  
                    <div className="mt-4 font-poppins">
                        <h2 className="mb-1"><i className="fas fa-box text-lg text-amber-800 mr-2"></i>Minimum order quantity: {clickedProduct.minimumOrderQuantity}</h2>
                        <h2 className="mb-1"><i className="fas fa-weight-hanging text-lg text-gray-800 mr-2"></i>Weight: {clickedProduct.weight}</h2>
                        <h2 className="mb-1"><i className="fas fa-shield-alt text-lg text-purple-800 mr-2"></i>Warranty: {clickedProduct.warrantyInformation}</h2>
                    </div>   
                </div>
            </div>

            )}

        {/* ------------to display reviews by customers--------- */}    
        {clickedProduct && clickedProduct.reviews && clickedProduct.reviews.length > 0  && (
           
            <section className="flex flex-col p-4 mt-10 overflow-y-scroll">
                <hr className=""></hr>
                <h1 className="text-center text-2xl font-mono bg-orange-500 text-white font-bold">customer reviews</h1>
                {/*--------iterating over reviews array----------*/}
                {clickedProduct.reviews.map( (review, index)=>(

                    <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md flex flex-col justify-between gap-2">
                          <h2 className="font-semibold font-mono"> name: {review.reviewerName}</h2>
                          <h3 className="font-semibold font-mono"> Rating: {review.rating < 3? <i className="fas fa-star text-red-500" >{review.rating}</i> : <i className="fas fa-star text-green-400" >{review.rating}</i>}</h3>
                          <p className="font-semibold font-mono">Comment: {review.comment}</p>
                          <div className="flex gap-2">
                            <i className="fas fa-thumbs-up text-blue-400 cursor-pointer hover:scale-125 duration-500"></i>
                            <i className="fas fa-thumbs-down text-orange-400 cursor-pointer hover:scale-125 duration-500"></i>
                          </div>
                    </div>
                ))}

            </section>
        )}
         
        </section>
        
    )
}

export default ProductDetail;