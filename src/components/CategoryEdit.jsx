import React, { useEffect, useState } from "react";
import MyNavbar from "./MyNavbar";
import { useParams, useNavigate } from "react-router-dom";
import getData from "../services/GetService";
import putService from "../services/PutService";

function CategoryEdit() {
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchCategory = async () => {
        try {
          const categoryData = await getData(`Admin/Categories/${id}`);
          setName(categoryData.name);
          setImageUrl(categoryData.imageUrl);
          setDescription(categoryData.description);
        } catch (error) {
          console.error("Kategori bilgileri alınamadı:", error);
        }
      };
  
      fetchCategory();
    }, [id]);
  
    const handleImageUrl = async (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            // Base64 formatına çevrilmiş resim verisi
            const base64Image = reader.result;
            setImageUrl(base64Image);
          };
          // Resmi base64'e çevir
          reader.readAsDataURL(file);
        }
      };
    const handleSaveChanges = async () => {
      try {
        const updatedCategory = {
            id:id,
          name: name,
          imageUrl: imageUrl,
          description: description,
        };
  
        await putService(`Admin/Categories`, updatedCategory);
  
        navigate(-1);

      } catch (error) {
        console.error("Kategori güncellenirken bir hata oluştu:", error);
      }
    };

  return (
    <div>
      <MyNavbar />
      <div className="container">
        <h3>Kategori Düzenle</h3>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Kategori Adı:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
        <label htmlFor="imageUrl" className="form-label">Resim Yükle:</label>
         <img src={imageUrl} alt="Gelmedi" width="200rem"/>
         <input
            type="file"
            className="form-control"
            id="imageUrl"
            onChange={handleImageUrl}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Açıklama:
          </label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSaveChanges}
        >
          Değişiklikleri Kaydet
        </button>
      </div>
    </div>
  );
}

export default CategoryEdit;
