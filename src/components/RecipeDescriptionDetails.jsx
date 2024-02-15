import React, { useEffect, useState } from "react";
import getData from "../services/GetService";
import { useParams } from "react-router-dom";

function RecipeDescriptionDetails() {
    const [descriptions, setDescriptions] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const fetchIngredients = async () => {
          try {
            const fetchedDescriptions = await getData(`RecipeDescription/${id}`);
            setDescriptions(fetchedDescriptions);
          } catch (error) {
            console.error("Malzemeler alinamadi:", error);
          }
        };
        fetchIngredients();
    }, [id]);
  return (
    <div>
         <div className="container">
          <div className="row">
            <div className="col">
            <h3 className="card-title" style={{color:"#297eba",textAlign: "left", marginLeft: "15px" }}><span className="bi bi-flower1"></span>Nasil yapilir?</h3>
            {descriptions.map((desc)=>(
              <div className="card mb-3" style={{border:"none"}}>
                <div className="card-body">
                
                  <ol>
                    <li className="list-group-item::marker" 
                    style={{unicodeBidi:"isolate", fontVariantNumeric:"tabular-nums",textTransform:"none", textIndent:"0px", textAlign:"start", textAlignLast:"last"}}>
                    <p className="card-text">
                    {desc.description}
                  </p>
                    </li>
                  </ol>
                </div>
                <img src={desc.imageUrl} className="card-img-top" alt="resim" style={{ height: "500px", width: "100%", borderRadius:"10px"}}/>
              </div>
            ))}
            </div>
           
          </div>
        </div>
    </div>
  )
}

export default RecipeDescriptionDetails