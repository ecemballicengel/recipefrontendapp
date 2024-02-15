import React, {useState } from "react";
import loginService from '../services/LoginService.js';
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate= useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      
      await loginService(userName, email, password);
      console.log("Başarılı giriş!");
      
    } catch (error) {
      console.error("Giriş başarısız:", error);
    }
    navigate('/')
  };
  return (
    <div className="container mt-5" >
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Giriş Yap</h2>
              <form onSubmit={handleLogin}>
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
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Şifre
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
                <button type="submit" className="btn btn-primary w-100">
                  Giriş Yap
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage