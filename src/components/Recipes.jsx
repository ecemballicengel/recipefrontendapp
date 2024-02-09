import React, { useEffect, useState } from "react";
import getData from "../services/GetService";

function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const fetchedRecipe = await getData("Recipe");
        setRecipes(fetchedRecipe);
      } catch (error) {
        console.error("Tarifler alinamadi:", error);
      }
    };
    fetchRecipe();
  }, []);
  return (
    <div>
      {recipes.map((recipe) => (
       <div className="card" style={{ width: "18rem" }}>
        <a href="">
        
       <img className="card-img-top" src={recipe.titleImage} alt="Card image cap" /> </a>
       <div className="card-body">
         <h5 className="card-title">{recipe.title}</h5>
         <p className="card-text"> Hazirlama suresi:
           {recipe.preparetionTime} dk
         </p>
       </div>
     </div>
      ))}
    </div>
  );
}

export default Recipes;
