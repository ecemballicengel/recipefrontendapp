import React from "react";
import Users from "../components/Users";
import AdminRecipe from "../components/AdminRecipe";
import AdminCategories from "../components/AdminCategories";
import MyNavbar from "../components/MyNavbar";

function AdminPage() {
  return (
    <>
    <MyNavbar/>
    <div className="container">
      <h3>Yonetim Paneli</h3>
      <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="user-tab"
            data-bs-toggle="tab"
            data-bs-target="#user-tab-pane"
            type="button"
            role="tab"
            aria-controls="user-tab-pane"
            aria-selected="true"
          >
            Kullanicilar
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="recipe-tab"
            data-bs-toggle="tab"
            data-bs-target="#recipe-tab-pane"
            type="button"
            role="tab"
            aria-controls="recipe-tab-pane"
            aria-selected="false"
          >
            Tarifler
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="category-tab"
            data-bs-toggle="tab"
            data-bs-target="#category-tab-pane"
            type="button"
            role="tab"
            aria-controls="category-tab-pane"
            aria-selected="false"
          >
            Kategoriler
          </button>
        </li>
        
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="user-tab-pane"
          role="tabpanel"
          aria-labelledby="user-tab"
          tabIndex={0}
        >
          <Users/>
        </div>
        <div
          className="tab-pane fade"
          id="recipe-tab-pane"
          role="tabpanel"
          aria-labelledby="recipe-tab"
          tabIndex={0}
        >
         <AdminRecipe/>
        </div>
        <div
          className="tab-pane fade"
          id="category-tab-pane"
          role="tabpanel"
          aria-labelledby="category-tab"
          tabIndex={0}
        >
          <AdminCategories/>
        </div>
      </div>
    </div>
    </>
  );
}

export default AdminPage;
