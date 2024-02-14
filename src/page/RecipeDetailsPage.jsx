import React from "react";
import RecipeDetails from "../components/RecipeDetails";
import RecipeIngradientsDetails from "../components/RecipeIngradientsDetails";
import RecipeDescriptionDetails from "../components/RecipeDescriptionDetails";

function RecipeDetailsPage() {
  return (
    <div>
     <div className="container">
      <RecipeDetails/>
      <RecipeIngradientsDetails/>
      <RecipeDescriptionDetails/>
     </div>
      </div>
  );
}

export default RecipeDetailsPage;
