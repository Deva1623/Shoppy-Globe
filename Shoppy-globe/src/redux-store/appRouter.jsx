import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProductList from '../components/ProductList';
import App from "../App";
import { Suspense } from "react";
import '../App.css'
import NotFound from  '../components/NotFound';

//lazy loading------------------------------
const ProductDetail = React.lazy(()=> import('../components/ProductDetail'));
const Cart = React.lazy(()=>import('../components/Cart'))

//-----------------Navbar and not found compo dont need lazyloading------------------------
const router = createBrowserRouter([
    
    {
       path:'/',
       element: <App/>,
       children:[
        {
            path:'',
            element: <ProductList></ProductList>
        },
        {
            path:'/cart',
            element: ( 
            <Suspense fallback={<div className="flex flex-col justify-center items-center mt-44 text-xl gap-10">Loading Please wait... <div className="loader"></div> </div>}>
                <Cart/>
            </Suspense>
            )
        },
        {
            path:'/product/:id',
            element: (
            <Suspense fallback={<div className="flex flex-col justify-center items-center mt-44 text-xl gap-10">Loading Please wait... <div className="loader"></div> </div>}>
               <ProductDetail/>
            </Suspense>)
        },
        {
            path: '*',
            element: <NotFound />,
        },

       ]
    },

])

export default router;