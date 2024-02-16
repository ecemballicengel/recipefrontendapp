import React, { useEffect, useState } from "react";
import getData from "../services/GetService";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";

function GetMenu() {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const fetchedMenu = await getData("Recipe/GetDailyMenu");
        setMenus(fetchedMenu);
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
    fetchMenu();
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="col">
            <h3 style={{color:"#8f1367"}}>Fikir Olsun Menusu</h3>
        <Carousel>
      {menus.map((menu) => (
        <Carousel.Item key={menu.id}>
          <img
            className="d-block w-100" style={{ height: "500px", borderRadius: "10px" }}
            src={menu.titleImage}
            alt={`Slide ${menu.id}`}
            onClick={() => navigate(`/recipe/${menu.id}`)}
          />
          <Carousel.Caption>
            <h3  style={{fontSize:"50px"}}>{menu.title}</h3>
            <p style={{fontSize:"20px"}}>Hazırlama süresi: {menu.preparetionTime} dk</p>
            <p style={{ color: "green" }}>
              {categories.find((category) => category.id === menu.categoryId)?.name}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
        </div>
      </div>
    </div>
  );
}

export default GetMenu;
