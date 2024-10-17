import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//this component is for showing snackbars at bottom

const Snackbar = () => {
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export const showToast = (message, type = 'default') => {
    
    toast(message, {
        type,
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
};

export default Snackbar;
