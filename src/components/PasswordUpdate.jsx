import React, { useState } from 'react'
import putService from "../services/PutService";
import Cookies from "js-cookie";

function PasswordUpdate() {
    const[password,setPassword]=useState("");
    const[newPassword,setNewPassword]=useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateData = {
            userId:Cookies.get("userId"),
            password,
            newPassword,
          };
          console.log(updateData)
          try {
            const result = await putService("User/UpdateUserPassword", updateData);
            console.log("Güncelleme Başarılı:", result);
          } catch (error) {
            console.error("Güncelleme Hatası:", error);
          }
      }
  return (
    <div>
         <div className="container mt-5" >
      <div className="row ">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Mevcut Şifre
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Yeni Şifre
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Guncelle
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default PasswordUpdate