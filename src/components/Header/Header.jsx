import React from 'react'
import './Header.scss'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <nav>
        <div className="container">
            <ul className="nav-wrapper">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </div>
    </nav>
  )
}

export default Header
