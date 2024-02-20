import React, { useEffect, useState } from 'react'
import getData from "../services/GetService";
import deleteService from "../services/DeleteService";
import { useNavigate } from 'react-router-dom';

function AdminRecipe() {
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
  
    const handleDelete = async (id) => {
        console.log(id);
    
        const request = {
          id: id,
        };
        await deleteService("Admin/Recipes", request);
        fetchData();
      }; 
      const fetchData = async () => {
        try {
          const fetchedRecipes = await getData("Admin/Recipes");
          const fetchedCategories = await getData("Admin/Categories");
  
          setRecipes(fetchedRecipes);
          setCategories(fetchedCategories);
        } catch (error) {
          console.error("Veri alınamadı:", error);
        }
      };
    useEffect(() => {
      
      fetchData();
    }, []);
    const handleEdit= async (id)=>{
      navigate(`../usertarif/${id}`)
  };
  return (
    <div className='container' style={{padding:"20px"}}>
        <h3>Tarifler</h3>
      <table className="table  table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tarifin Adi</th>
            <th>Fotografi</th>
            <th>Kategori</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe.id}>
              <td>{recipe.id}</td>
              <td>{recipe.title}</td>
              <td><img src={recipe.titleImage} alt="" style={{maxWidth:"5rem", maxHeight:"4rem", borderRadius:"60px"}}/></td>
              <td>{categories.find(category => category.id === recipe.categoryId)?.name || "Belirtilmemiş"}</td>
             <td><button
                  className="btn btn-warning"
                  onClick={() => handleEdit(recipe.id)}
                >
                  <span class="bi bi-pencil-square"></span>
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(recipe.id)}
                >
                  <span class="bi bi-trash"></span>
                </button> </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminRecipe;