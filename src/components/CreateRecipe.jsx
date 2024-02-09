import React, { useState } from "react";
import postService from "../services/PostService.js"
function CreateRecipe() {
    const [title, setTitle] = useState("");
    const [titleImage, setTitleImage] = useState("");
    const [numberOfPeople, setNumberOfPeople] = useState(0);
    const [preparetionTime, setPreparetionTime] = useState(0);
    const [cookingTime, setCookingTime] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const recipeData = {
        title,
        titleImage,
        numberOfPeople,
        preparetionTime,
        cookingTime,
        categoryId
      };
  
      try {
        const result = await postService("Recipe", recipeData);
        console.log("Başarılı! İşlem sonucu:", result);
       
      } catch (error) {
        console.error("Hata oluştu:", error);
      
      }
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
      
        if (file) {
          const reader = new FileReader();
      
          reader.onloadend = () => {
            // Base64 formatına çevrilmiş resim verisi
            const base64Image = reader.result;
            console.log(base64Image);
      
            // Base64 verisini state'e atayın
            setTitleImage(base64Image);
          };
      
          // Resmi base64'e çevir
          reader.readAsDataURL(file);
        }
      };
      
  
    return (
      <div>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Yemegin adi
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="String giriniz"
                    required=""
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="titleImage" className="form-label">
                    Başlık Resmi URL
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="titleImage"
                    //value={titleImage}
                    // onChange={(e) => setTitleImage(e.target.value)}
                    onChange={handleImageChange}
                    placeholder="String giriniz"
                    required=""
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="numberOfPeople" className="form-label">
                    Kişi Sayısı
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="numberOfPeople"
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(e.target.value)}
                    placeholder={0}
                    required=""
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="preparetionTime" className="form-label">
                    Hazırlık Süresi (dakika)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="preparetionTime"
                    value={preparetionTime}
                    onChange={(e) => setPreparetionTime(e.target.value)}
                    placeholder={0}
                    required=""
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="cookingTime" className="form-label">
                    Pişirme Süresi (dakika)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="cookingTime"
                    value={cookingTime}
                    onChange={(e) => setCookingTime(e.target.value)}
                    placeholder={0}
                    required=""
                  />
                </div>
                <div className="mb-3">
                <label htmlFor="categoryId" className="form-label">
                  Kategori ID
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="categoryId"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  placeholder={0}
                  required=""
                />
              </div>
                <button type="submit" className="btn btn-primary">
                  Kaydet
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
export default CreateRecipe;
