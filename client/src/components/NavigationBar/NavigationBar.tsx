import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import "./NavigationBar.css"
import {AiOutlineMenu} from 'react-icons/ai'
import {CgWorkAlt} from 'react-icons/cg'
const NavigationBar = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  function loginPage() {
    setDropdownOpen(false)
    setLoggedIn(!loggedIn)
  }
  return (
    <header>
      <nav className='nav'>
        <Link onClick={() => setDropdownOpen(false)} to="/table-view" className='nav-logo'>
          <h1>
          <span className='nav-logo-big'>Job</span><br />
          <span className='nav-logo-small'>Tracker <CgWorkAlt /></span>
            </h1></Link>

        <ul className='nav-menu'>
        <Link to="/table-view">Table</Link>
      <Link  to="/kanban-view">Kanban</Link>
      {loggedIn ? <Link to='/' onClick={() => setLoggedIn(!loggedIn)}>Logout</Link> : <Link  onClick={() => setLoggedIn(!loggedIn)} to="/login">Login</Link>}
        </ul>
        <AiOutlineMenu aria-hidden className='toggle-dropdown' onClick={() => setDropdownOpen(!dropdownOpen)}/>

        
        {dropdownOpen && 
        <ul className="nav-dropdown">
    <Link onClick={() => setDropdownOpen(false)} to="/table-view">Table</Link>
      <Link  onClick={() => setDropdownOpen(false)} to="/kanban-view">Kanban</Link>
      {loggedIn ? <Link to='/' onClick={() => loginPage()}>Logout</Link> : <Link  onClick={() => loginPage()} to="/login">Login</Link>}
        </ul>}
        </nav></header>
  )
}

export default NavigationBar