import React, { useEffect, useState } from "react";
import getData from "../services/GetService";
import { useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function RecipeIngradientsDetails() {
  const [ingredients, setIngredients] = useState([]);
  const [amountTypes, setAmountTypes] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const fetchedIngredients = await getData(`RecipeIngredient/${id}`);
        setIngredients(fetchedIngredients);
      } catch (error) {
        console.error("Malzemeler alinamadi:", error);
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

    fetchIngredients();
    fetchAmountTypes();
  }, [id]);

  const getAmountTypeName = (amountTypeId) => {
    const amountType = amountTypes.find((type) => type.id === amountTypeId);
    return amountType ? amountType.name : "Bilinmiyor";
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <h3 style={{ color: "#8f1367",textAlign: "left", marginLeft: "15px"  }}><span className="bi bi-flower1"></span>Malzemeler</h3>
            <div className="card" style={{ width: "28rem", border:"none"}}>
              <ul className="list-group list-group-flush">
                {ingredients.map((ingredient) => (
                  <li
                    className="list-group-item::marker" 
                    style={{unicodeBidi:"isolate", fontVariantNumeric:"tabular-nums",textTransform:"none", textIndent:"0px", textAlign:"start", textAlignLast:"last"}}
                    key={ingredient.id}
                    value={ingredient.amountTypeId}
                  >
                    {ingredient.amount}{" "}
                    {getAmountTypeName(ingredient.amountTypeId)}{" "}
                    {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
            <hr style={{borderWidth: "3px", borderColor: "#8f1367", borderStyle: "solid" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default RecipeIngradientsDetails;
