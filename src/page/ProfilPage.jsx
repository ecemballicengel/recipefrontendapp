import React, { useEffect, useState } from "react";
import MyNavbar from "../components/MyNavbar";
import getData from "../services/GetService";
import { useParams } from "react-router-dom";
import UserData from "../components/UserData";
import PasswordUpdate from "../components/PasswordUpdate";
import UserRecipe from "./UserRecipe";


function ProfilPage() {
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const[loading, setLoading]=useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getData(`User/${id}`);
        console.log("Alınan Kullanıcılar:", fetchedUsers);
        setUsers([fetchedUsers]);
      } catch (error) {
        console.error("Kullanici alinamadi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  },[id]);

  return (
    <div>
      <MyNavbar/>
      <div className="container">
        <div className="row">
         {users.map((user)=> (
          <div className="col-md-3" key={user.userId} >
            <div className="card-group">
              <div className="card" style={{ margin: "30px" }}>
                <img src={user.imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{user.userName}</h5>
                  <p className="card-text">
                    {user.role}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      <b> {user.recipeCount}</b>
                    </small>
                  </p>
                  <h6>Tarif</h6>
                </div>
              </div>
            </div>
          </div>
          ))}
          <div className="col-md-9">
            <ul
              className="nav nav-tabs"
              id="myTab"
              role="tablist"
              style={{ margin: "50px" }}
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="user-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#user"
                  type="button"
                  role="tab"
                  aria-controls="user"
                  aria-selected="true"
                >
                  Kullanici Bilgilerini Guncelle
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="password-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#password"
                  type="button"
                  role="tab"
                  aria-controls="password"
                  aria-selected="false"
                >
                  Sifre Degistir
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="recipe-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#recipe"
                  type="button"
                  role="tab"
                  aria-controls="recipe"
                  aria-selected="false"
                >
                  Tariflerim
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="user"
                role="tabpanel"
                aria-labelledby="user-tab"
              >
                <div className="container">
                <h5 className="text-start">Kullanici Bilgilerini Guncelle</h5>
                <UserData/>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="password"
                role="tabpanel"
                aria-labelledby="password-tab"
              >
                <div className="container">
                <h5 className="text-start">Sifreni Degistir</h5>
                <PasswordUpdate/>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="recipe"
                role="tabpanel"
                aria-labelledby="recipe-tab"
              >
                <div className="container">
                <h5 className="text-start">Tariflerim</h5>
                <UserRecipe/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilPage;
