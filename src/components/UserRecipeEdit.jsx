import React, { useEffect, useState } from "react";
import MyNavbar from "./MyNavbar";
import { useParams } from "react-router-dom";
import getData from "../services/GetService";
import putService from "../services/PutService";


function UserRecipeEdit() {
  //Recipe
  const [title, setTitle] = useState("");
  const [titleImage, setTitleImage] = useState();
  const [newTitleImage, setNewTitleImage] = useState(); //Eger Image Degistiyse kullanilacak
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [preparetionTime, setPreparetionTime] = useState(0);
  const [cookingTime, setCookingTime] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [categories, setCategories] = useState([]);
  const [amountTypes, setAmountTypes] = useState([]);

  //Ingredients
  const [ingredients, setIngredients] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [amountTypeId, setAmountTypeId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");

  //Descriptions
  const [descriptions, setDescriptions] = useState([]);
  const { id } = useParams();
  const [nextDescriptionId, setNextDescriptionId] = useState(1);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchRecipeById = async () => {
      try {
        const fetchedData = await getData(`RecipeBusinnessWorkFlow/${id}`);
        console.log(fetchedData);
        setTitle(fetchedData.recipe.title);
        setTitleImage(fetchedData.recipe.titleImage);
        setNumberOfPeople(fetchedData.recipe.numberOfPeople);
        setPreparetionTime(fetchedData.recipe.preparetionTime);
        setCookingTime(fetchedData.recipe.cookingTime);
        setCategoryId(fetchedData.recipe.categoryId);
        setIngredients(fetchedData.ingredients);
        setNextId(ingredients.length + 1);
        setNextDescriptionId(descriptions.length + 1);
        setDescriptions(fetchedData.descriptions);
      } catch (error) {
        console.error("Malzemeler alinamadi:", error);
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

    const fetchAmountTypes = async () => {
      try {
        const fetchedAmountTypes = await getData("AmountType");
        setAmountTypes(fetchedAmountTypes);
      } catch (error) {
        console.error("Miktar tipleri alinamadi:", error);
      }
    };
    fetchAmountTypes();
    fetchCategories();
    fetchRecipeById();
  }, [id]);
  const handleTitle = (event) => {
    // Update the state with the new input value
    setTitle(event.target.value);
    console.log(title);
  };
  const handleNop = (event) => {
    // Update the state with the new input value
    setNumberOfPeople(event.target.value);
    console.log(numberOfPeople);
  };
  const handlePrepTime = (event) => {
    // Update the state with the new input value
    setPreparetionTime(event.target.value);
    console.log(preparetionTime);
  };
  const handleCookingTime = (event) => {
    // Update the state with the new input value
    setCookingTime(event.target.value);
    console.log(cookingTime);
  };
  const handleImageUrl = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Base64 formatına çevrilmiş resim verisi
        const base64Image = reader.result;
        setNewTitleImage(base64Image);
        setTitleImage(base64Image);
      };
      // Resmi base64'e çevir
      reader.readAsDataURL(file);
    }
  };
  const handleIngredientNameChange = (event, index) => {
    // Create a new array with the updated value at the specified index
    const updatedValues = [...ingredients];
    updatedValues[index].name = event.target.value;

    // Update the state with the new array
    setIngredients(updatedValues);
  };

  const handleIngredientAmountChange = (event, index) => {
    // Create a new array with the updated value at the specified index
    const updatedValues = [...ingredients];
    updatedValues[index].amount = event.target.value;

    // Update the state with the new array
    setIngredients(updatedValues);
  };

  const handleIngredientAmountTypeChange = (event, index) => {
    // Create a new array with the updated value at the specified index
    const updatedValues = [...ingredients];
    updatedValues[index].amountTypeId = event.target.value;
    // Update the state with the new array
    setIngredients(updatedValues);
    console.log(ingredients);
  };
  const handleDescriptionDescriptionChange = (event, index) => {
    // Create a new array with the updated value at the specified index
    const updatedValues = [...descriptions];
    updatedValues[index].description = event.target.value;
    // Update the state with the new array
    setDescriptions(updatedValues);
    console.log(descriptions);
  };
  const handleDescriptionImageChange = (event, index) => {
    // Create a new array with the updated value at the specified index
    const updatedValues = [...descriptions];
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Base64 formatına çevrilmiş resim verisi
        const base64Image = reader.result;
        updatedValues[index].imageUrl = base64Image;
        setDescriptions(updatedValues);
      };
      // Resmi base64'e çevir
      reader.readAsDataURL(file);
    }
    // Update the state with the new array

    console.log(descriptions);
  };

  const handleImageChange = (event) => {
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

  const handleUpdate = async () =>{
    let request = {
      "recipeId":id,
      "updateRecipeRequestDto":{
        id,
        title,
        titleImage,
        numberOfPeople,
        preparetionTime,
        cookingTime,
        categoryId
      },
      "updateRecipeDescriptionRequestDto":[...descriptions],      
      "updateRecipeIngredientRequestDto":[...ingredients]     
    }

    await putService("RecipeBusinnessWorkFlow",request);

  }

  return (
    <div>
      <MyNavbar />
      {/* Recipes */}
      <div
        className="container"
        style={{ maxHeight: "600px", overflowY: "auto", border: "1px solid" }}
      >
        <h3>Tarif Bilgileri</h3>
        <div
          className="row justify-content-center"
          style={{ margin: "20px", padding: "20px" }}
        >
          <div className="col-3">
            <p>
              <b>Tarif Resmi: </b>
            </p>
          </div>
          <div className="col-3">
            <img src={titleImage} width="200rem" />
            <input type="file" onChange={handleImageUrl} />
          </div>
        </div>
        <div
          className="row justify-content-center"
          style={{ margin: "20px", padding: "20px" }}
        >
          <div className="col-2">
            <p>
              <b>Tarif Adi: </b>
            </p>
          </div>
          <div className="col-2">
            <input type="text" onChange={handleTitle} value={title} />
          </div>
        </div>
        <div
          className="row justify-content-center"
          style={{ margin: "20px", padding: "20px" }}
        >
          <div className="col-2">
            <p>
              <b>Kisi Sayisi: </b>
            </p>
          </div>
          <div className="col-2">
            <input type="number" onChange={handleNop} value={numberOfPeople} />
          </div>
        </div>
        <div
          className="row justify-content-center"
          style={{ margin: "20px", padding: "20px" }}
        >
          <div className="col-2">
            <p>
              <b>Hazirlama Suresi: </b>
            </p>
          </div>
          <div className="col-2">
            <input
              type="number"
              onChange={handlePrepTime}
              value={preparetionTime}
            />
          </div>
        </div>
        <div
          className="row justify-content-center"
          style={{ margin: "20px", padding: "20px" }}
        >
          <div className="col-2">
            <p>
              <b>Pisirme Suresi: </b>
            </p>
          </div>
          <div className="col-2">
            <input
              type="number"
              onChange={handleCookingTime}
              value={cookingTime}
            />
          </div>
        </div>
        <div
          className="row justify-content-center"
          style={{ margin: "20px", padding: "20px" }}
        >
          <div className="col-2">
            <p>
              <b>Kategori: </b>
            </p>
          </div>
          <div className="col-2">
            <select
              className="form-select"
              id="categoryId"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="0" defaultValue={0}>
                Kategori Seçiniz
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Ingredients */}
      <div
        className="container"
        style={{ maxHeight: "600px", overflowY: "auto", border: "1px solid" }}
      >
        <h3>Malzemeler</h3>
        <div className="row">
          {ingredients.map((ingredient, index) => (
            <div
              className="row"
              style={{ padding: "20px", margin: "20px" }}
              key={index}
            >
              <div className="col">
                <label style={{ paddingRight: "10px" }}>
                  Malzeme Miktari:{" "}
                </label>
                <input
                  type="number"
                  value={ingredient.amount}
                  onChange={(event) =>
                    handleIngredientAmountChange(event, index)
                  }
                />
              </div>
              <div className="col">
                <select
                  className="form-select"
                  id="amount"
                  value={ingredient.amountTypeId}
                  onChange={(event) =>
                    handleIngredientAmountTypeChange(event, index)
                  }
                >
                  <option value="0" defaultValue={0}>
                    Miktar Tipini Seçiniz
                  </option>
                  {amountTypes.map((amounType) => (
                    <option key={amounType.id} value={amounType.id}>
                      {amounType.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <label style={{ paddingRight: "10px" }}>Malzeme Adi: </label>
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(event) => handleIngredientNameChange(event, index)}
                />
                <button
                  className="btn btn-danger btn-sm"
                  style={{ marginBottom: "6px", marginLeft: "15px" }}
                  onClick={() => {
                    setIngredients(
                      ingredients.filter((x) => x.id !== ingredient.id)
                    );
                  }}
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="row" style={{ padding: "20px", margin: "20px" }}>
          <div className="col-4">
            <label style={{ paddingRight: "10px" }}>Malzeme Miktari:</label>
            <input
              type="number"
              id="amount"
              placeholder="Miktar bilgisi"
              title="Malzeme Miktari"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="col-4">
            <select
              className="form-select"
              id="amount"
              value={amountTypeId}
              onChange={(e) => setAmountTypeId(e.target.value)}
            >
              <option value="0" defaultValue={0}>
                Miktar Tipini Seçiniz
              </option>
              {amountTypes.map((amounType) => (
                <option key={amounType.id} value={amounType.id}>
                  {amounType.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-4">
            <label style={{ paddingRight: "10px" }}>Malzeme Adi: </label>
            <input
              type="text"
              id="name"
              title="Malzeme Adi"
              placeholder="MalzemeAdi"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col" style={{ margin: "5px" }}>
            <button
              className="btn btn-sm btn-primary"
              style={{ marginBottom: "6px", marginLeft: "15px" }}
              onClick={(e) => {
                e.preventDefault();
                setIngredients([
                  ...ingredients,
                  {
                    id: nextId,
                    amount: amount,
                    name: name,
                    amountTypeId: amountTypeId,
                  },
                ]);
                setNextId(nextId + 1);
                setAmount(0);
                setName("");
                setAmountTypeId(0);
              }}
            >
              {" "}
              Ekle
            </button>
          </div>
        </div>
      </div>
      <div
        className="container"
        style={{ maxHeight: "600px", overflowY: "auto", border: "1px solid" }}
      >
        <h3>Nasil Yapilir</h3>
        {descriptions.map((description, index) => (
          <div className="row" style={{ padding: "25px" }}>
            <div className="col-7">
              <label style={{ fontWeight: "bold" }}>Tarif: </label>
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "5px",
                }}
              >
                <textarea
                  value={description.description}
                  onChange={(event) =>
                    handleDescriptionDescriptionChange(event, index)
                  }
                  style={{
                    width: "100%",
                    height: "230px",
                    boxSizing: "border-box",
                  }}
                ></textarea>
              </div>
            </div>
            <div className="col-3">
              <label>Resim: </label>
              <img
                src={description.imageUrl}
                value={description.imageUrl}
                width="180rem"
              />
              <input
                style={{ marginTop: "30px" }}
                type="file"
                onChange={(event) => handleDescriptionImageChange(event, index)}
              />
            </div>
            <div className="col">
              {" "}
              <button
                className="btn btn-danger "
                style={{ marginTop: "60px" }}
                onClick={() => {
                  setDescriptions(
                    ingredients.filter((x) => x.id !== description.id)
                  );
                }}
              >
                Sil
              </button>{" "}
            </div>
          </div>
        ))}

        {/* Tarif yapilisi ekleme */}
        <div className="row">
          <hr />
          <div className="col-7">
            <label style={{ fontWeight: "bold" }}>Tarif: </label>
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "5px",
              }}
            >
              <textarea
                value={description}
                style={{
                  width: "100%",
                  height: "230px",
                  boxSizing: "border-box",
                }}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="col-3">
            <label>Resim: </label>
            <img
              src={description.imageUrl}
              value={description.imageUrl}
              width="180rem"
            />
            <input
              style={{ marginTop: "30px" }}
              type="file"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h4>Tarif Ekle</h4>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button
              className="btn btn-sm btn-primary"
              style={{ marginBottom: "6px", marginLeft: "15px" }}
              onClick={(e) => {
                e.preventDefault();
                setDescriptions([
                  ...descriptions,
                  {
                    id: nextDescriptionId,
                    description: description,
                    imageUrl: imageUrl,
                  },
                ]);
                setNextDescriptionId(nextDescriptionId + 1);
                setAmount(0);
                setName("");
                setAmountTypeId(0);
              }}
            >
              {" "}
              Ekle
            </button>
          </div>
        </div>
      </div>
      <div className="row" style={{ padding: "25px" }}>
        <div className="col">
          <button className="btn btn-lg btn-success" onClick={handleUpdate}>
            Degisiklikleri Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserRecipeEdit;
