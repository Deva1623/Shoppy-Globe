
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white  my-8 mb-0">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
           
            <div>
              <h4 className="font-bold text-lg mb-4">Shoppy Globe</h4>
              <ul>
                <li><a  className="hover:text-teal-400">About Us</a></li>
                <li><a  className="hover:text-teal-400">Services</a></li>
                <li><a  className="hover:text-teal-400">Contact</a></li>
              </ul>
            </div>
            
           
            <div>
              <h4 className="font-bold text-lg mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <button  className=" bg-blue-500 p-1 rounded-md"><i className="fab fa-facebook-f" style={{ fontSize: '24px' }}></i></button>
                <button className= "  bg-blue-400 p-1 rounded-md"><i className="fab fa-twitter" style={{ fontSize: '24px' }}></i></button>
                <button  className=" bg-pink-400 p-1 rounded-md"><i className="fab fa-instagram" style={{ fontSize: '24px' }}></i></button>
              </div>
            </div>
    
           
            <div>
              <h4 className="font-bold text-lg mb-4">Contact Us</h4>
              <p className="mb-2">Email: shoppy@Globe.com</p>
              <p>Phone: 123456789</p>
            </div>

          </div>

          <div className="text-center mt-6 border-t border-gray-700 pt-4">
            <p className='font-mono'>&copy; 2024 Diwakar Saxena. All rights reserved.</p>
          </div>

        </footer>
      );
};


export default Footer;
