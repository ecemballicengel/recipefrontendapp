import React, { useState } from 'react';
import postService from '../services/PostService';

function CategoryAdd() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const category = {
        name: name,
        imageUrl: imageUrl,
        description: description,
      };

      const result = await postService("Admin/Categories", category);

      setName("");
      setDescription("");
      setImageUrl("");
    } catch (error) {
      console.error("Kategori eklenemedi:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Kategori Ekle</h3>
      <div className="row">
        <div className="col">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Kategori Adı:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">Resim Yükle:</label>
          <input
            type="file"
            className="form-control"
            id="imageUrl"
            name="imageUrl"
            onChange={handleImageUrl}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Açıklama:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Kategori Ekle</button>
      </form>
      </div>
      </div>
    </div>
  );
}

export default CategoryAdd;
