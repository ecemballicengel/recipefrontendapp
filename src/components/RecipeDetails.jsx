import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import getData from "../services/GetService";

function RecipeDetails() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const fetchedRecipe = await getData(`Recipe/${id}`);
        setRecipes([fetchedRecipe]);
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
  }, [id]);
  return (
    <div>
      <div className="container">
        <div className="row">
          {recipes.map((recipe) => (
            <div className="col" key={recipe.id}>
              <div className="text-overlay" style={{ color: "#8f1367" }}>
                <h1 style={{ textAlign: "left", marginLeft: "15px" }}>
                  {recipe.title}
                </h1>
              </div>
              <img
                className="img-fluid"
                src={recipe.titleImage}
                alt="Resim"
                style={{ height: "500px", width: "100%", borderRadius: "10px" }}
              />

              <div>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li class="breadcrumb-item">
                      <Link to="/" style={{ color: "#8f1367" }}>
                        Yemek
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="/kategori" style={{ color: "#8fb939" }}>
                        Kategori
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="#" style={{ color: "#ffc107" }}>
                        {
                          categories.find(
                            (category) => category.id === recipe.categoryId
                          )?.name
                        }
                      </Link>
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <h3 style={{ color: "#8f1367" }}>
                    <span className="bi bi-flower1"></span>Kac kisilik
                  </h3>
                  <h5>{recipe.numberOfPeople}</h5>
                  <hr
                    style={{
                      borderWidth: "3px",
                      borderColor: "#8f1367",
                      borderStyle: "solid",
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <h3 style={{ color: "#8f1367" }}>
                    <span className="bi bi-flower1"></span>Hazirlama suresi
                  </h3>
                  <h5>{recipe.preparetionTime} dakika</h5>
                  <hr
                    style={{
                      borderWidth: "3px",
                      borderColor: "#8f1367",
                      borderStyle: "solid",
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <h3 style={{ color: "#8f1367" }}>
                    <span className="bi bi-flower1"></span>Pisirme suresi
                  </h3>
                  <h5>{recipe.cookingTime} dakika</h5>
                  <hr
                    style={{
                      borderWidth: "3px",
                      borderColor: "#8f1367",
                      borderStyle: "solid",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
