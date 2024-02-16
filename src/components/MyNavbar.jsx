import React, { useState } from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Cookies from "js-cookie";

function MyNavbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get("token"));

  const handleLogout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
        <Link className="navbar-brand" to="/kategori">
        <span className="bi bi-list"/>
          </Link>
          <Link className="navbar-brand" to="/">
            <img
              src={logo}
              alt="7'den77'ye"
              style={{ width: "6rem", height: "6rem", borderRadius: "20px" }}
            />
          </Link>
          <ul className="navbar-nav ms-auto">
          {isAuthenticated ? (
          <>
          <li className="nav-item">
          <Link className="nav-link" to="/profil">
                Kullanici Profili
              </Link>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleLogout}>
                /Cikis Yap
              </button>
            </li>
            </>
            ) : (
              <>
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
            </>
             )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default MyNavbar;
