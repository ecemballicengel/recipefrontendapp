import React, { useState } from 'react'
import postService from '../services/PostService.js';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
   const [userName, setUserName]= useState("");
   const [password, setPassword]= useState("");
   const [controlPassword, setControlPassword]=useState("");
   const [email, setEmail]=useState("");
   const navigate= useNavigate();

   const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const registerResponse = await postService('Register', {
            userName,
            email,
            password,
            controlPassword,
          });
          console.log('Kayit Başarili:', registerResponse);   
    } catch (error) {
        console.error('Kayit Başarisiz:', error.message);
    }
    navigate('/login')
    }

  return (
    
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Kullanici Bilgilerini Giriniz</h2>
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">
                    Kullanici Adi
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
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Tekrar Şifre Giriniz
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="controlPassword"
                    value={controlPassword}
                    onChange={(e) => setControlPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Kayit Ol
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-8"><Link className="nav-link text-underlined" title="Uye ol" to="/login"  style={{textDecoration:"underline"}}>
                Giris yapmak icin tiklayiniz.
              </Link></div>
      </div>
    </div>
  )
}

export default RegisterPage