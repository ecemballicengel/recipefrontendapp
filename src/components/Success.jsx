import React from 'react'
import { useNavigate } from 'react-router-dom';

function Success() {
    const navigate = useNavigate();
    const handleButton = () => {
        navigate('/register')
    };
  return (
    <div className="container">
        <div className="row d-flex align-items-center justify-content-center" style={{ height: '60vh' }}>
        <div className="col-md-6  mx-auto">
      <h2>Ödeme Başarılı!</h2>
      <p>Ödemeniz başarıyla tamamlandı. Teşekkür ederiz!</p>
      <button className='btn btn-success' onClick={handleButton}> Tamam </button>
      </div>
      </div>
    </div>
  )
}

export default Success