import React from 'react'
import './not-found.css'
import notFoundSVG from "../../../src/assets/undraw_page_not_found.svg"

function NotFound() {
  
  
    return (
    <div className='not-found-container'>
        <img  src={notFoundSVG} alt='Page not found.'/>
        <h3>PAGE NOT FOUND</h3>
    </div>
    )
}

export default NotFound;