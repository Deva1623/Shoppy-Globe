
import { useEffect, useState } from "react";

//This componet fetches from api url---------

 const useFetchProducts = () =>{


 const [ products, setProducts] = useState([]);  //this stores products [] state
 
 const [error , setError] = useState(null);      //for storing error

 const [loading, setLoading] = useState(true);  //for loading


 useEffect( ()=>{

     const fetchData = async()=>{

         try{
            const response = await fetch('https://dummyjson.com/products');
            const data = await response.json();
            console.log('data', data);
            setProducts(data.products);     //storing products in state
         }
         catch(e){
           setError('Unable to fetch');
         }
         finally{
             setLoading(false);            //when loading done its set to false
         }
     }
     fetchData();
  
 } , [])                                   //empty array means it runs only once

 return {products, error, loading};

 }


 

 export default useFetchProducts;