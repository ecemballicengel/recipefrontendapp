import React, { useEffect, useState } from "react";
import getData from "../services/GetService";
import { Link } from "react-router-dom";
import MyNavbar from "./MyNavbar";
import Footer from "./Footer";

function Category() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getData("Category");
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Kategoriler alinamadi:", error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <>
    <MyNavbar/>
    <div className="container text-center" style={{paddingTop:"50px"}}>
    <h3 style={{ color: "#8f1367" }}>Kategoriler</h3>
     <ul className="list-group list-group-horizontal">
      {categories.slice(0,5).map((category) => (
      <Link  key={category.id} to={`/Recipe/category/${category.id}`}>
      <div className="card text-bg-dark" style={{ margin:"20px", border:"none"}}>
       <img src={category.imageUrl} className="card-img" alt="..." style={{width:"200px", height:"200px"}} />
       <div className="card-img-overlay">
         <h5 className="card-title">{category.name}</h5>
       </div>
     </div>     
      </Link>
      ))}
      </ul>
      <ul className="list-group list-group-horizontal">
      {categories.slice(5).map((category) => (
      <Link  key={category.id} to={`/Recipe/category/${category.id}`}>
      <div className="card text-bg-dark" style={{ margin:"20px",border:"none"}}>
       <img src={category.imageUrl} className="card-img" alt="..."  style={{width:"200px", height:"200px"}} />
       <div className="card-img-overlay">
         <h5 className="card-title">{category.name}</h5>
       </div>
     </div>     
      </Link>
      ))}
      </ul>
    </div>
    <Footer/>
    </>
  );
}

export default Category;
