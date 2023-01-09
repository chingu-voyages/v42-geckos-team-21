import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import "./NavigationBar.css"
const NavigationBar = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <header>
      <nav className='nav'>
        <Link to="/" className='nav-logo'>
          <h1>
          <span className='nav-logo-big'>Job</span><br />
          <span className='nav-logo-small'>Tracker</span>
            </h1></Link>

        <ul className='nav-menu'>
          <li onClick={() => setLoggedIn(!loggedIn)}>{loggedIn ? 'Logout' : "Login"}</li>
          {loggedIn && <li>Logged in</li>}
        </ul>
        </nav></header>
  )
}

export default NavigationBar