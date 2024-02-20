import React, { useEffect, useState } from 'react';
import getData from "../services/GetService";
import deleteService from "../services/DeleteService";
import { useNavigate, useParams } from 'react-router-dom';

function AdminCategories() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const{id}= useParams();

    const handleDelete = async (id) => {
        console.log(id);
    
        const request = {
          id: id,
        };
        await deleteService("Admin/Categories", request);
        fetchData();
    }; 
    const handleAdd = () => {

        navigate('/kategoriEkle');
      };
      
    const fetchData = async () => {
        try {
          const fetchedCategories = await getData("Admin/Categories");
          setCategories(fetchedCategories);
        } catch (error) {
          console.error("Veri alınamadı:", error);
        }
    };

    useEffect(() => {
    
      fetchData();
    }, []);
    const handleEdit= async (id)=>{
        navigate(`kategoriGuncelle/${id}`)
    };
  return (
    <div className='container' style={{padding:"20px"}}>
    <h3>Kategoriler</h3>
  <table className="table  table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>Adi</th>
        <th>Fotografi</th>
        <th>Aciklamasi</th>
        <th> </th>
      </tr>
    </thead>
    <tbody>
      {categories.map((category) => (
        <tr key={category.id}>
          <td>{category.id}</td>
          <td>{category.name}</td>
          <td><img src={category.imageUrl} alt="" style={{maxWidth:"5rem", maxHeight:"4rem", borderRadius:"60px"}}/></td>
          <td>{category.description}</td>
         <td><button
              className="btn btn-warning"
              onClick={() => handleEdit(category.id)}
            >
              <span className="bi bi-pencil-square"></span>
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(category.id)}
            >
              <span className="bi bi-trash"></span>
            </button> </td>
        </tr>
      ))}
    </tbody>
  </table>
  <div>
    <button className='btn btn-success'><span class="bi bi-plus-circle"
    onClick={handleAdd}
    ></span></button>
  </div>
</div>
  )
}

export default AdminCategories