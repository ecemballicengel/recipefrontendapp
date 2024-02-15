import React from "react";
import RecipeDetails from "../components/RecipeDetails";
import RecipeIngradientsDetails from "../components/RecipeIngradientsDetails";
import RecipeDescriptionDetails from "../components/RecipeDescriptionDetails";
import Navbar from "../components/Navbar";

function RecipeDetailsPage() {
  return (
    <div>
      <Navbar/>
     <div className="container">
      <RecipeDetails/>
      <RecipeIngradientsDetails/>
      <RecipeDescriptionDetails/>
     </div>
      </div>
  );
}

export default RecipeDetailsPage;
