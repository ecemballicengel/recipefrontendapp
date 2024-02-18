import React, { useState } from "react";
import putService from "../services/PutService";
import Cookies from "js-cookie";

function UserData() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
        userId:Cookies.get("userId"),
        userName,
        email,
        imageUrl,
      };
      console.log(updateData)
      try {
        const result = await putService("User/UpdateUserProfile", updateData);
        console.log("Güncelleme Başarılı:", result);
      } catch (error) {
        console.error("Güncelleme Hatası:", error);
      }
      window.location.reload();
  }
  const handleImageUrl = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Base64 formatına çevrilmiş resim verisi
        const base64Image = reader.result;
        setImageUrl(base64Image);
      };
      // Resmi base64'e çevir
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <div className="container mt-5">
        <div className="row ">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="userName" className="form-label">
                      Kullanıcı Adı
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      E-mail
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group row">
              <label htmlFor="imageUrl" className="col-sm-3 col-form-label">
                Fotograf ekle
              </label>
              <div className="col-sm-10">
                <input
                  type="file"
                  className="form-control"
                  id="imageUrl"
                  title="Profil Fotografini seciniz"
                  onChange={handleImageUrl}
                />
              </div>
              </div>
              <div className="form-group-row" style={{ marginTop: "20px" }}>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Guncelle
              </button>
            </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserData;
