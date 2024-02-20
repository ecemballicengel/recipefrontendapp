import React, { useEffect, useState } from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Cookies from "js-cookie";
import getData from "../services/GetService";
import { useParams } from "react-router-dom";

function MyNavbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!Cookies.get("token")
  );
 

  const handleLogout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
  };
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getData(`User/${Cookies.get("userId")}`);
        setUsers([fetchedUsers]);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [id]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/kategori">
            <span className="bi bi-list" />
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
                {users.map((user) => (
                  <li className="nav-item" key={user.userId}>
                    {Cookies.get("role") === "Admin" ? (
                      <Link
                        className="nav-link"
                        to="/adminPage"
                        style={{ color: "#8f1367", fontWeight: "bold" }}
                      >
                        {user.userName}
                      </Link>
                    ) : (
                      <Link
                        className="nav-link"
                        to={`/user/${user.userId}`}
                        style={{ color: "#8f1367", fontWeight: "bold" }}
                      >
                        {user.userName}
                      </Link>
                    )}
                  </li>
                ))}
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/tarifEkle"
                    style={{ color: "#8f1367", fontWeight: "bold" }}
                  >
                    Tarif Ekle
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link"
                    onClick={handleLogout}
                    style={{ color: "#8f1367", fontWeight: "bold" }}
                  >
                    Cikis Yap
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    style={{ color: "#8f1367", fontWeight: "bold" }}
                  >
                    Giriş Yap
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/register"
                    style={{ color: "#8f1367", fontWeight: "bold" }}
                  >
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
