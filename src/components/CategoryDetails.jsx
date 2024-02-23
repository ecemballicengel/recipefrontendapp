import React, { useEffect, useState } from "react";
import getData from "../services/GetService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MyNavbar from "./MyNavbar";

function CategoryDetails() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  useEffect(() => {
    const fetchRecipesByCategory = async () => {
      try {
        const fetchedRecipes = await getData(`Recipe/category/${id}`);
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error("Tarifler alınamadı:", error);
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
    fetchCategories();
    fetchRecipesByCategory();
    
    
  }, [id]);
  return (
    <div>
        <MyNavbar/>
      <div className="container text-center" style={{ paddingTop: "50px",overflowWrap:"break-word" }}>
      <h3 style={{ color: "#8f1367" }}>
                {categories[id-1]?.name}
                 <span> </span>Tarifleri
              </h3>
        <div className="row">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="col-md-4">
            
              <div className="card text-dark mb-4 shadow rounded">
                <img
                  src={recipe.titleImage}
                  className="card-img-top"
                  alt="..."
                  width={100}
                  style={{ height: "200px", objectFit: "cover",cursor: "pointer" }}
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                />
                <div className="card-body">
                  <h5 className="card-title" style={{whiteSpace: "break-spaces"}}>{recipe.title}</h5>
                  <p className="card-text">
                    Hazırlama süresi: {recipe.preparetionTime} dk
                  </p>
                  <div className="card-footer">
                    <small className="text-body-secondary">
                      <img
                        src={recipe.userImage}
                        alt=""
                        style={{
                          maxWidth: "5rem",
                          maxHeight: "4rem",
                          borderRadius: "100px",
                        }}
                      />
                      {recipe.userName}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryDetails;
