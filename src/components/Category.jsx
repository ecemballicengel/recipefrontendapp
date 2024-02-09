import React, { useEffect, useState } from "react";
import getData from "../services/GetService";
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
    <div className="container text-center">
     <ul className="list-group list-group-horizontal">
      {categories.slice(0,5).map((category) => (
      <a href="/category/">
      <div className="card text-bg-dark" style={{ margin:"20px"}}>
       <img src={category.imageUrl} className="card-img" alt="..." style={{width:"200px", height:"200px"}} />
       <div className="card-img-overlay">
         <h5 className="card-title">{category.name}</h5>
       </div>
     </div>     
      </a>
      ))}
      </ul>
      <ul className="list-group list-group-horizontal">
      {categories.slice(5).map((category) => (
      <a href="/category/">
      <div className="card text-bg-dark" style={{ margin:"20px"}}>
       <img src={category.imageUrl} className="card-img" alt="..."  style={{width:"200px", height:"200px"}} />
       <div className="card-img-overlay">
         <h5 className="card-title">{category.name}</h5>
       </div>
     </div>     
      </a>
      ))}
      </ul>
    </div>
  );
}

export default Category;
