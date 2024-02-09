import React from 'react'
import logo from '../img/logo.png'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">
    <img src={logo} alt="7'den77'ye" style={{ width: "6rem", height: "6rem", borderRadius: "20px" }}/>
    </Link>
    <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Giriş Yap
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    /Uye Ol
                  </Link>
                </li>
              </ul>
  </div>
</nav>

    </div>
  )
}

export default Navbar