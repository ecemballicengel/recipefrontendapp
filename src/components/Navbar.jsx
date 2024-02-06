import React from 'react'
import logo from '../img/logo.png'

function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
    <img src={logo} alt="7'den77'ye" style={{ width: "6rem", height: "6rem", borderRadius: "20px" }}/>
    </a>
  </div>
</nav>

    </div>
  )
}

export default Navbar