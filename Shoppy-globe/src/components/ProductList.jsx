
import useFetchProducts from "../hooks/useFetchProducts"
import ProductItem from "./ProductItem"  //child importing
import '../App.css';
import { useEffect, useState } from "react";
import { showToast } from "./SnackBar";

function ProductList (){

 const [filteredProducts, setFilteredProducts] = useState([]);
 const {products, loading, error} = useFetchProducts();  //taking all data from useFetchProducts
 
 // use state to store states-----------------
 const [searchInput, setSearchInput] = useState('');
 const [selectedRating, setSelectedRating] = useState('');
 const [selectedPrice, setSelectedPrice] = useState('');
 const [selectedCategory, setSelectedCategory] = useState('');

 //for dynamic rating filter options---------------
 const options = [
  { value: '', label: 'Select Rating' },
  { value: '3orAbove', label: '3 Stars or Above' },
  { value: '4orAbove', label: '4 Stars or Above' },
];

//-------------------------when category or rating or price filter change this will run-------------------
useEffect(() => {
  let result = [...products];
  
  // fitering based on category selected
  if (selectedCategory) {
    result = result.filter(product => product.category === selectedCategory);
  }

  // fitering based on rating selected
  if (selectedRating) {
    result = result.filter(product => {
      if (selectedRating === '3orAbove') {
        return product.rating >= 3;
      } else if (selectedRating === '4orAbove') {
        return product.rating >= 4;
      }
      return true;
    });
  }

  // fitering based on price selected
  if (selectedPrice) {
    result.sort((a, b) => {
      return selectedPrice === 'costlyFirst' ? b.price - a.price : a.price - b.price;
    });
  }

  setFilteredProducts(result);
}, [products, selectedCategory, selectedRating, selectedPrice]);


//---------------------------- this handles Search functionality with filters----------------------------
const handleSearch = () => {

  let result = [...products];

  //if search is not empty then search
  if (searchInput.trim() !== "") {

    result = result.filter(product =>
      product.title.toLowerCase().includes(searchInput.toLowerCase())
    );
  }else{
    showToast('Please Enter Something', 'info')    //show msg bottom
  }


  //if category selected than filter by category 
  if (selectedCategory) {
    result = result.filter(product => product.category === selectedCategory);
  }

  //if rating selected than filter by rating 
  if (selectedRating) {
    result = result.filter(product => {
      if (selectedRating === '3orAbove') {
        return product.rating >= 3;
      } else if (selectedRating === '4orAbove') {
        return product.rating >= 4;
      }
      return true;
    });
  }
  

  //if Price selected than filter by price 
  if (selectedPrice) {
    result.sort((a, b) => {
      return selectedPrice === 'costlyFirst' ? b.price - a.price : a.price - b.price;
    });
  }

  // setting filtered products based on combined filters
  setFilteredProducts(result);

  
  if (searchInput.trim() === "") {
    setSearchInput('');
  }
};


//----------------------Function handling filters on buttons---------------------------------------------------
const handleRatingFilter = (e) => {
  setSelectedRating(e.target.value);
};

const handlePriceFilter = (e) => {
  setSelectedPrice(e.target.value);
};

const handleCategoryFilter = (e) => {
  setSelectedCategory(e.target.value);
};

//------------------to clear all filters---------------------------------------------------
const clearFilters=()=>{
  setSelectedCategory('');
  setSelectedPrice('');
  setSelectedRating('');
}


//------------------- when data being fetched spiiner will come-------------------------------
 if(loading){return (
 <div className="flex flex-col justify-center items-center mt-44 text-xl gap-10">
    Loading Please wait... <div className="loader"></div> 
 </div>
 )} 

 if(error){return showToast('Something went wrong', 'error')}  
 

//============================================= U I ========================================================

  return (
   <section className="container mx-auto mt-10">
      
      
      <div className="flex flex-col  md:flex-row justify-center items-center gap-4 w-full">
            
            {/*----------search bar----------------*/}
            <input  value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="p-2 border-4 shadow-xl border-gray-500 w-72 rounded-xl focus:scale-125 focus:mr-10 duration-500" type='text' placeholder="Search your product..."   ></input>
            <button onClick={handleSearch} className="bg-blue-900 font-mono hover:bg-teal-600 w-28 text-white font-bold p-2 rounded-md hover:-translate-y-2 duration-300"><i className="fas fa-search mr-2 text-lg"></i>search</button>
            
            
            {/*----------dropdown for rating filter----------------*/}
            {filteredProducts.length>0  &&
            <select onChange={handleRatingFilter} value={selectedRating} className={`border-4 border-gray-600 text-yellow-500 p-2  text-sm md:text-lg rounded-xl font-bold cursor-pointer hover:bg-white hover:text-black
            ${selectedRating === "" ? 'bg-transparent': 'bg-gray-700 text-white  '}   `}>
              
              {options.map((option)=>(
               <option key={option.value} value={option.value}>{option.label}</option>
                
              ))}
            </select>
            }

            {/*----------dropdown for Price filter----------------*/}
            {filteredProducts.length>0  &&
            <select onChange={handlePriceFilter} value={selectedPrice} className={`border-4 border-gray-600 text-yellow-500 p-2 text-sm md:text-lg rounded-xl font-bold cursor-pointer hover:bg-white hover:text-black
            ${selectedPrice === "" ? 'bg-transparent': 'bg-gray-700 text-white '}   `}>
               <option   value=''>filter by price</option>
               <option value='costlyFirst'>costly to cheap</option>
               <option value='cheapFirst'>cheap to costly</option>
            </select>
            }

            {/*----------dropdown for category filter----------------*/}
            
            {filteredProducts.length>0  &&

            <select onChange={handleCategoryFilter} value={selectedCategory} className={`border-4 text-center text-sm md:text-lg border-gray-600 text-yellow-500 p-2 rounded-xl font-bold cursor-pointer hover:bg-white hover:text-black
            ${selectedCategory === "" ? 'bg-transparent': 'bg-gray-700 text-white'}  `}>
              
              <option  value=''>find by category</option>
              <option value='beauty'>beauty</option>
              <option  value='furniture'>furniture</option>
              <option value='groceries'>groceries</option>
              <option value='fragrances'>fragrances</option>
            </select>
            }   
            
            {/*----------conditional rendering clear filter button----------------*/}
            { (selectedCategory || selectedPrice || selectedRating) && <button onClick={clearFilters} className="bg-green-700 opacity-70  shadow-lg  shadow-gray-400 rounded-lg text-white font-bold p-1"><i className="fas fa-filter mr-1"></i>Clear Filters</button>}
      </div>
      
       
       {/*------Child component rendering all products--------------*/}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 relative'>
        {filteredProducts.length>0?   filteredProducts.map( (product)=> (
           <ProductItem key={product.id} product={product}></ProductItem>
        )
        ):
        (
           <div className="flex flex-col justify-center items-center absolute mt-1 md:mt-52 inset-0">
            <div>
              <img className="mx-auto w-56 md:w-72 h-auto" src='https://cdni.iconscout.com/illustration/premium/thumb/nothing-found-illustration-download-in-svg-png-gif-file-formats--empty-not-fount-search-limerror-pack-design-development-illustrations-2815869.png?f=webp'></img>
            </div>
            <h1 className="font-bold text-amber-600 text-xl md:text-4xl">Nothing found</h1>
           </div>
        )
        
        }
      </div>

   </section>
    
  )
}

export default ProductList;