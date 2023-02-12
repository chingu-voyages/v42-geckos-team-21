import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./NavigationBar.css"
import { AiOutlineMenu } from 'react-icons/ai'
import { CgWorkAlt } from 'react-icons/cg'
import { MONGOOSE_API_HOST } from '../../index'
import axios from 'axios'

import { IfcUser } from '../../index'

interface props {
  user: IfcUser | null;
  setUser: React.Dispatch<React.SetStateAction<IfcUser | null>>;
}

const NavigationBar = (props: props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header>
      <nav className='nav'>
        <Link onClick={() => setDropdownOpen(false)} to="/table-view" className='nav-logo'>
          <h1>
            <span className='nav-logo-big'>Job</span><br />
            <span className='nav-logo-small'>Tracker <CgWorkAlt /></span>
          </h1></Link>

        <ul className='nav-menu'>
          <Link onClick={() => setDropdownOpen(false)} to="/table-view">Table</Link>
          <Link onClick={() => setDropdownOpen(false)} to="/kanban-view">Kanban</Link> 
          {props.user ? <Link onClick={(e) => logout()} to='/'>Logout</Link> : <Link to="/login">Login</Link>}
        </ul>
        <AiOutlineMenu aria-hidden className='toggle-dropdown' onClick={() => setDropdownOpen(prevState => !prevState)} />


        {dropdownOpen &&
          <ul className="nav-dropdown">
            <Link onClick={() => setDropdownOpen(false)} to="/table-view">Table</Link>
            <Link onClick={() => setDropdownOpen(false)} to="/kanban-view">Kanban</Link>
            {props.user ? <Link to='/' onClick={() => setDropdownOpen(false)}>Logout</Link> : <Link onClick={() => setDropdownOpen(false)} to="/login">Login</Link>}
          </ul>}
      </nav></header>
  )

  function logout() {
    axios.get(MONGOOSE_API_HOST + '/api/logout', { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          props.setUser(null);
          setDropdownOpen(false);
          // TODO: Alert on not 200 response
        }
      })
  }
}

export default NavigationBar