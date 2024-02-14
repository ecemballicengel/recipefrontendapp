import React, { useEffect, useState } from "react";
import getData from "../services/GetService";
import { Link, useNavigate, useParams } from "react-router-dom";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const fetchedRecipe = await getData("Recipe");
        setRecipes(fetchedRecipe);
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
    fetchRecipe();
    fetchCategories();
  }, []);
  return (
    <div>
      <div className="container">
        <h3>Tarifler</h3>
        <div className="card-group" style={{ margin: "25px", padding: "55px" }}>
          <div className="row">
            {recipes.map((recipe) => (
              <div className="col-sm-3" style={{ padding: "10px" }}>
                <div
                  className="card"
                  style={{ width: "14rem", height: "100%" }}
                >
                  <img
                    src={recipe.titleImage}
                    className="card-img-top"
                    alt="card image"
                    style={{ maxHeight: "120px", objectFit: "cover",cursor: "pointer" }}
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{recipe.title}</h5>
                    <p className="card-text">
                      Hazırlama süresi: {recipe.preparetionTime} dk
                    </p>
                    <p className="card-text" style={{color:"green"}}>{categories.find(category => category.id === recipe.id)?.name}</p>
                  </div>
                  <div className="card-footer">
                    <small className="text-body-secondary">
                      <img
                        src={recipe.userImage}
                        alt="userImage"
                        style={{ width: "9px", height: "9px" }}
                      />
                    </small>
                    <small className="text-body-secondary">Kullanıcı adı</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipes;
