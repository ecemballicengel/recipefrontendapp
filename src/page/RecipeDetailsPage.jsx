import React from "react";
import RecipeDetails from "../components/RecipeDetails";
import RecipeIngradientsDetails from "../components/RecipeIngradientsDetails";
import RecipeDescriptionDetails from "../components/RecipeDescriptionDetails";
import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";
import Comment from "../components/Comment";

function RecipeDetailsPage() {
  return (
    <div>
      <MyNavbar/>
     <div className="container">
      <RecipeDetails/>
      <RecipeIngradientsDetails/>
      <RecipeDescriptionDetails/>
      <Comment/>
     </div>
     <Footer/>
      </div>
  );
}

export default RecipeDetailsPage;
