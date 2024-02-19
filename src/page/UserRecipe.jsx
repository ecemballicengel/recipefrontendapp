import React, { useEffect, useState } from "react";
import getData from "../services/GetService";
import {useNavigate, useParams } from "react-router-dom";


function UserRecipe() {
    const [userRecipes, setUserRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserRecipe = async () => {
          try {
            const fetchedUserRecipe = await getData(`Recipe/UserId/${id}`);
            setUserRecipes(fetchedUserRecipe);
          } catch (error) {
            console.error("Tarifler alinamadi:", error);
          }
        };
        const fetchCategories = async () => {
          try {
            const fetchedCategories = await getData("Category");
            setCategories(fetchedCategories);
          } catch (error) {
            console.error("Kategoriler alinamadi:", error);
          }
        };
        fetchUserRecipe();
        fetchCategories();
      }, []);

      const  handleButton=(id)=>{
        navigate(`/usertarif/${id}`)
      };
  return (
    <div>
     <div className="container">
        <div className="card-group" style={{ margin: "25px", padding: "55px", overflowY:"scroll", height:"500px" }}>
          <div className="row">
            {userRecipes.map((recipe) => (
              <div className="col-sm-6" style={{ padding: "50px"}}>
                <div
                  className="card shadow rounded"
                  style={{ width: "15rem", height: "100%", border:"none" }}
                >
                  <img
                    src={recipe.titleImage}
                    className="card-img-top"
                    alt="card image"
                    style={{ height: "120px", objectFit: "cover",cursor: "pointer" }}
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{recipe.title}</h5>
                    <p className="card-text">
                      Hazırlama süresi: {recipe.preparetionTime} dk
                    </p>
                    <p className="card-text" style={{color:"green"}}>{categories.find(category => category.id === recipe.categoryId)?.name}</p>
                   
                  </div>
                  <div>
                  <button type="button" className="btn btn-primary" onClick={()=>handleButton(recipe.id)}> <span class="bi bi-pencil-square"></span></button>
                  </div>
                  <div className="card-footer">
                        <small className="text-body-secondary">
                        <img src={recipe.userImage} alt="" style={{maxWidth:"5rem", maxHeight:"4rem"}} />
                        {recipe.userName}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserRecipe