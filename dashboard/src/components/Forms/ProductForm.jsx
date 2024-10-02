import React, { useState, useEffect } from "react";
import "./Forms.css";

const ProductForm = () => {
  const [presentations, setPresentations] = useState([]);
  const [selectedPresentations, setSelectedPresentations] = useState([]);
  const [presentationType, setPresentationType] = useState("solido");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [productImages, setProductImages] = useState([
    { file: null, previewUrl: null },
    { file: null, previewUrl: null },
    { file: null, previewUrl: null },
    { file: null, previewUrl: null },
    { file: null, previewUrl: null },
  ]);
  const [descriptions, setDescriptions] = useState(["", "", "", "", ""]);
  const [uses, setUses] = useState(["", "", "", "", ""]);

  const fetchPresentations = async () => {
    const response = await fetch("http://localhost:3000/presentaciones");
    const data = await response.json();
    setPresentations(data);
  };

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:3000/categorias");
    const data = await response.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchPresentations();
    fetchCategories();
  }, []);

  const handlePresentationSelect = (id) => {
    setSelectedPresentations((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((presentationId) => presentationId !== id)
        : [...prevSelected, id]
    );
  };

  const handleCategorySelection = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      const updatedImages = [...productImages];
      updatedImages[index] = { file, previewUrl };
      setProductImages(updatedImages);
    }
  };

  const handleDescriptionChange = (index, value) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[index] = value;
    setDescriptions(updatedDescriptions);
  };

  const handleUseChange = (index, value) => {
    const updatedUses = [...uses];
    updatedUses[index] = value;
    setUses(updatedUses);
  };

  const descriptionsObj = {
    site1: descriptions[0],
    site2: descriptions[1],
    site3: descriptions[2],
    site4: descriptions[3],
    site5: descriptions[4],
  };

  const usesObj = {
    site1: uses[0],
    site2: uses[1],
    site3: uses[2],
    site4: uses[3],
    site5: uses[4],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", document.getElementById("product-name").value);
      formData.append("presentations", JSON.stringify(selectedPresentations));
      formData.append("categories", JSON.stringify(selectedCategories));
      productImages.forEach((imageObj, index) => {
        if (imageObj.file) formData.append(`site${index + 1}`, imageObj.file);
      });

      formData.append("descriptions", JSON.stringify(descriptionsObj));

      formData.append("uses", JSON.stringify(usesObj));
      const response = await fetch("http://localhost:3000/productos/nuevo", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Product created successfully");
      } else {
        console.error("Error creating product");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="form-group">
            <label htmlFor="product-name" className="card-label">
              Nombre
            </label>
            <input
              type="text"
              id="product-name"
              placeholder="Ingresar nombre"
              className="input-field"
            />
          </div>
          {/* // Presentations */}
          <div className="form-group">
            <label className="card-label">Presentaciones</label>
            <select
              id="presentationType"
              value={presentationType}
              onChange={(event) => setPresentationType(event.target.value)}
              required
              className="input-field"
            >
              <option value="solido">Sólidas</option>
              <option value="liquido">Líquidas</option>
            </select>
            <div className="presentations-body">
              {presentations.map((presentation) => (
                <div key={presentation._id} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={`presentation-${presentation._id}`}
                    checked={selectedPresentations.includes(presentation._id)}
                    onChange={() => handlePresentationSelect(presentation._id)}
                  />
                  <label htmlFor={`presentation-${presentation._id}`}>
                    {presentation.name} ({presentation.type})
                  </label>
                </div>
              ))}
            </div>
          </div>
          {/* // Categories */}
          <div className="form-group">
            <label className="card-label">Categorías</label>
            <div className="categories-body">
              {categories.map((category) => (
                <div key={category._id} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={`category-${category._id}`}
                    checked={selectedCategories.includes(category._id)}
                    onChange={() => handleCategorySelection(category._id)}
                  />
                  <label htmlFor={`category-${category._id}`}>
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {/* Descriptions */}
          <div className="form-group">
            <label className="card-label">Descripciones</label>
            {descriptions.map((description, index) => (
              <textarea
                key={index}
                value={description}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                placeholder={`Descripción ${index + 1}`}
                className="textarea-field"
              />
            ))}
          </div>
          {/* Uses */}
          <div className="form-group">
            <label className="card-label">Usos</label>
            {uses.map((use, index) => (
              <input
                key={index}
                value={use}
                onChange={(e) => handleUseChange(index, e.target.value)}
                placeholder={`Uso ${index + 1}`}
                className="input-field"
              />
            ))}
          </div>
          {/* Product Images */}
          <div className="form-group">
            <label className="card-label">Imágenes</label>
            <div className="image-container">
              {productImages.map((imageObj, index) => (
                <div key={index} className="image-circle">
                  <label
                    htmlFor={`product-image-${index}`}
                    className="image-upload-label"
                  >
                    {imageObj.previewUrl ? (
                      <img
                        src={imageObj.previewUrl}
                        alt={`Product ${index + 1}`}
                        className="image-preview"
                      />
                    ) : (
                      <span className="plus-sign">+</span>
                    )}
                  </label>
                  <input
                    type="file"
                    id={`product-image-${index}`}
                    className="image-upload-input"
                    accept="image/*"
                    onChange={(event) => handleImageUpload(event, index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </form>
        <div className="form-group">
          <button type="submit" className="submit-button">
            Añadir producto
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
