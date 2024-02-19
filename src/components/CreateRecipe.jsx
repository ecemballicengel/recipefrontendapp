import React, { useEffect, useState } from "react";
import getData from "../services/GetService";
import postService from "../services/PostService";

function CreateRecipe() {
  const [categories, setCategories] = useState([]);
  const [amountTypes, setAmountTypes] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [title, setTitle] = useState("");
  const [titleImage, setTitleImage] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [preparetionTime, setPreparetionTime] = useState(0);
  const [cookingTime, setCookingTime] = useState(0);

  //Malzemeler
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [amountTypeId, setAmountTypeId] = useState(0);
  const [nextId, setNextId] = useState(1);
  const [ingredients, setIngredients] = useState([]);

  //Tarif yapilisi
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [descriptions, setDescriptions] = useState([]);
  const [textId, setTextId] = useState(1);

  useEffect(() => {
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
  }, []);

  const handleImageTitle = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Base64 formatına çevrilmiş resim verisi
        const base64Image = reader.result;
        setTitleImage(base64Image);
      };
      // Resmi base64'e çevir
      reader.readAsDataURL(file);
    }
  };
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
    const addRecipeRequestDto = {
      title,
      titleImage,
      numberOfPeople,
      preparetionTime,
      cookingTime,
      categoryId,
    };

    const createRecipeIngredientRequestDto = [...ingredients];
    const createRecipeDescriptionRequestDto = [...descriptions];

    const request={
      addRecipeRequestDto:addRecipeRequestDto,
      createRecipeIngredientRequestDto:createRecipeIngredientRequestDto,
      createRecipeDescriptionRequestDto:createRecipeDescriptionRequestDto
    }

    console.log(request)
    //post metodunu cagir
    try {
      const result = await postService("RecipeBusinnessWorkFlow", request);
      console.log("Başarılı! İşlem sonucu:", result);
    } catch (error) {
      console.error("Hata oluştu:", error);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3>Yemek Tarifi</h3>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form>
            <div className="form-group row">
              <label htmlFor="title" className="col-sm-3 col-form-label">
                Yemek Adi
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Basliginizi giriniz"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="titleImage" className="col-sm-3 col-form-label">
                Başlik Resmi
              </label>
              <div className="col-sm-10">
                <input
                  type="file"
                  className="form-control"
                  id="titleImage"
                  title="Yemek Fotografini seciniz"
                  onChange={handleImageTitle}
                />
              </div>
            </div>
            <div className="form-group row" style={{ marginTop: "20px" }}>
              <div className="col-sm">
                <input
                  type="number"
                  className="form-control"
                  id="numberOfPeople"
                  placeholder="Kac Kisilik"
                  title="Yemek Kac Kisi icin hazirlanabilir?"
                  onChange={(e) => setNumberOfPeople(e.target.value)}
                />
              </div>
              <div className="col-sm">
                <input
                  type="number"
                  className="form-control"
                  id="preparetionTime"
                  title="Yemek hazirlama suresi"
                  placeholder="Hazirlama suresi(dk)"
                  onChange={(e) => setCookingTime(e.target.value)}
                />
              </div>
              <div className="col-sm">
                <input
                  type="number"
                  className="form-control"
                  id="cookingTime"
                  title="Yemek Pisirme suresi"
                  placeholder="Pisirme Suresi(dk)"
                  onChange={(e) => setPreparetionTime(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="titleImage" className="col-sm-3 col-form-label">
                Kategori
              </label>
              <div className="col-sm-10">
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
            <div className="form-group row" style={{ marginTop: "20px" }}>
              <h4>Malzemeler</h4>
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  placeholder="Adet bilgisi"
                  title="Adet Bilgisi"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="col">
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
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  title="Malzeme Adi"
                  placeholder="MalzemeAdi"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col" style={{ margin: "5px" }}>
                <button
                  className="btn btn-sm btn-primary"
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
                  Malzeme Ekle
                </button>
              </div>
              <div
                className="row"
                style={{
                  border: "none",
                  padding: "5px",
                  marginTop: "20px",
                  height: "250px",
                  overflowY: "auto",
                }}
              >
                <h5>Malzeme Listesi</h5>
                <ul>
                  {ingredients.map((ingredient) => (
                    <li>
                      {ingredient.amount}
                      {
                        amountTypes.find((x) => x.id == ingredient.amountTypeId)
                          ?.name
                      }
                      {ingredient.name}
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          setIngredients(
                            ingredients.filter((x) => x.id !== ingredient.id)
                          );
                        }}
                      >
                        Malzemeyi Sil
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="row">
            <div className="form-group row" style={{ marginTop: "20px" }}>
              <h4>Yemegin Yapilisi</h4>
              <div className="col">
                <textarea
                  rows={5}
                  cols={26}
                  className="form-control"
                  id="description"
                  placeholder="Tarifinizin yapilis adimlarini yaziniz."
                  title="Tarifi yaziniz"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="imageUrl" className="col-sm-3 col-form-label">
                Tarif Adim Resmi
              </label>
              <div className="col-sm-10">
                <input
                  type="file"
                  className="form-control"
                  id="imageUrl"
                  title="Yemek Fotografini seciniz"
                  onChange={handleImageUrl}
                />
              </div>
            </div>
            <div className="col" style={{ margin: "5px" }}>
              <button
                className="btn btn-sm btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setDescriptions([
                    ...descriptions,
                    {
                      id: textId,
                      description: description,
                      imageUrl: imageUrl,
                    },
                  ]);
                  setTextId(textId + 1);
                  setDescription("");
                  setImageUrl("");
                }}
              >
                {" "}
                Sonraki Adimi Ekle
              </button>
            </div>
            <div
              className="row"
              style={{
               
                padding: "5px",
                marginTop: "20px",
                height: "250px",
                overflowY: "auto",
              }}
            >
              <h5>Yapilis Listesi</h5>
                {descriptions.map((desc) => (
                    <div className="card">
                      <div className="row g-0">                       
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">{desc.id}. Adim</h5>
                            <p className="card-text">
                            {desc.description}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-2">
                          {desc.imageUrl !== "" ? <img
                            src={desc.imageUrl}
                            className="img-fluid rounded-start"
                            alt="..."
                            style={{height:"70px", margin:"60px"}}
                          /> : ""}
                        </div>
                      </div>
                    </div>
                ))}
            </div>
            </div>
            <div className="form-group-row" style={{ marginTop: "20px" }}>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateRecipe;
