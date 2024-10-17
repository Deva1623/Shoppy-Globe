import React from "react";
import { Link } from "react-router-dom";


//------------for unmatched routes---------------------------
function NotFound(){
    
    return (
     
        <section className="min-h-screen flex flex-col justify-center items-center">
            <Link to='/' className="bg-black text-white p-4 rounded-sm font-bold">Go back</Link>
            <img className="h-[auto] w-[800px]" src={'https://static.vecteezy.com/system/resources/thumbnails/024/818/205/original/spaceship-fly-bw-404-error-animation-shuttle-in-orbit-rocket-empty-state-4k-concept-footage-alpha-channel-transparency-outline-monochrome-page-not-found-flash-message-for-ui-ux-web-design-video.jpg'}></img>
            <h2 className="text-center text-2xl font-bold text-gray-800">Page Not Found</h2>
            <p className="text-center text-lg text-gray-600">sorry, but the page you are looking for doesn't exist.</p>
        </section>

    )

}

export default NotFound;