import React, { useState } from "react";
import getData from "../services/GetService";
import { useNavigate } from "react-router-dom";

function Search() {
  const [keyword, setKeyword] = useState("");
  const [searchCriteria, setSearchCriteria] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await getData(
        `Recipe/Search?criteria=${searchCriteria}&keyword=${keyword}`
      );
      console.log(searchCriteria + keyword);
      setSearchResults(response);
      console.log(searchResults);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <form className="d-flex" role="search" onSubmit={handleSearch}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Yemek ara"
          aria-label="Search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button
          className="btn"
          style={{ backgroundColor: "#8f1367", color: "white" }}
          type="submit"
        >
          <span className="bi bi-search" />
        </button>
      </form>

      <div className="row">
        <div className="col-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="searchCriteria"
              id="resultTitle"
              checked={searchCriteria == 0}
              onChange={() => setSearchCriteria(0)}
            />
            <label className="form-check-label" htmlFor="resultTitle">
              Tarif
            </label>
          </div>
        </div>
        <div className="col-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="searchCriteria"
              id="ingredients"
              checked={searchCriteria == 2}
              onChange={() => setSearchCriteria(2)}
            />
            <label className="form-check-label" htmlFor="ingredients">
              Malzeme
            </label>
          </div>
        </div>
        <div className="col-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="searchCriteria"
              id="resultDescription"
              checked={searchCriteria == 1}
              onChange={() => setSearchCriteria(1)}
            />
            <label className="form-check-label" htmlFor="resultDescription">
              Açıklama
            </label>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className={`modal ${showModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-fullscreen" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Arama Sonuçları</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col">
            <div className="modal-body">
              <div className="row">
                {searchResults?.map((result) => (
                  <div className="col-3" style={{ padding: "5px" }}>
                    <div
                      className="card shadow rounded"
                      style={{ width: "14rem", height: "100%", border: "none" }}
                    >
                      <img
                        src={result.titleImage}
                        className="card-img-top"
                        alt="card image"
                        style={{
                          height: "200px",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate(`/recipe/${result.id}`)}
                      />
                      <div className="card-body">
                        <h5
                          className="card-title"
                          style={{ whiteSpace: "break-spaces" }}
                        >
                          {result.title}
                        </h5>
                        <p className="card-text">
                          Hazırlama süresi: {result.preparetionTime} dk
                        </p>
                      </div>
                      <div className="card-footer">
                        <small className="text-body-secondary">
                          <img
                            src={result.userImage}
                            alt=""
                            style={{
                              maxWidth: "5rem",
                              maxHeight: "4rem",
                              borderRadius: "100px",
                            }}
                          />
                          {result.userName}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>
            </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={closeModal}
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
