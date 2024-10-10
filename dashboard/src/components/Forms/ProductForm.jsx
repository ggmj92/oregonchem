import React, { useRef, useState, useEffect } from "react";
import "./Forms.css";

const ProductForm = () => {
  const [presentations, setPresentations] = useState([]);
  const [filteredPresentations, setFilteredPresentations] = useState([]);
  const [selectedPresentations, setSelectedPresentations] = useState([]);
  const [presentationType, setPresentationType] = useState("solido");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [descriptions, setDescriptions] = useState(Array(5).fill(""));
  const [uses, setUses] = useState(Array(5).fill(""));
  const [productImages, setProductImages] = useState(
    Array(5).fill({ file: null, previewUrl: null })
  );

  useEffect(() => {
    const fetchData = async () => {
      const [presentationsResponse, categoriesResponse] = await Promise.all([
        fetch("http://localhost:3000/presentaciones"),
        fetch("http://localhost:3000/categorias"),
      ]);

      const presentationsData = await presentationsResponse.json();
      const categoriesData = await categoriesResponse.json();

      setPresentations(presentationsData);
      setCategories(categoriesData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredPresentations(
      presentations.filter(
        (presentation) => presentation.type === presentationType
      )
    );
  }, [presentationType, presentations]);

  const toggleSelection = (array, setArray, itemId) => {
    setArray((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleDescriptionChange = (index, value) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = value;
    setDescriptions(newDescriptions);
  };

  const handleUseChange = (index, value) => {
    const newUses = [...uses];
    newUses[index] = value;
    setUses(newUses);
  };

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProductImages((prev) => {
        const updatedImages = [...prev];
        updatedImages[index] = { file, previewUrl };
        return updatedImages;
      });
    }
  };

  const handleArrayChange = (array, setArray, index, value) => {
    setArray((prev) => {
      const updatedArray = [...prev];
      updatedArray[index] = value;
      return updatedArray;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productName = document.getElementById("product-name").value;
    if (!productName) {
      alert("Product name is required");
      return;
    }

    if (selectedPresentations.length === 0) {
      alert("At least one presentation must be selected");
      return;
    }

    if (selectedCategories.length === 0) {
      alert("At least one category must be selected");
      return;
    }

    for (let i = 0; i < descriptions.length; i++) {
      if (!descriptions[i]) {
        alert(`Description ${i + 1} is required`);
        return;
      }
    }

    for (let i = 0; i < uses.length; i++) {
      if (!uses[i]) {
        alert(`Use ${i + 1} is required`);
        return;
      }
    }

    try {
      const formData = new FormData();
      formData.append("name", document.getElementById("product-name").value);
      formData.append("presentations", JSON.stringify(selectedPresentations));
      formData.append("categories", JSON.stringify(selectedCategories));

      descriptions.forEach((description, index) => {
        formData.append(`descriptions[${index}]`, description);
      });

      uses.forEach((use, index) => {
        formData.append(`uses[${index}]`, use);
      });

      productImages.forEach((imageObj, index) => {
        if (imageObj.file) {
          formData.append(`site${index + 1}`, imageObj.file);
        }
      });

      await fetch("http://localhost:3000/productos/nuevo", {
        method: "POST",
        body: formData,
      });

      setProductImages(Array(5).fill({ file: null, previewUrl: null }));
      setDescriptions(Array(5).fill(""));
      setUses(Array(5).fill(""));
      setSelectedPresentations([]);
      setSelectedCategories([]);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Error adding product. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
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
        <div className="form-group">
          <label className="card-label">Presentaciones</label>
          <select
            id="presentationType"
            value={presentationType}
            onChange={(e) => setPresentationType(e.target.value)}
            required
            className="input-field"
          >
            <option value="solido">Sólidas</option>
            <option value="liquido">Líquidas</option>
          </select>
          <div className="presentations-body">
            {filteredPresentations.map((presentation) => (
              <div key={presentation._id} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`presentation-${presentation._id}`}
                  checked={selectedPresentations.includes(presentation._id)}
                  onChange={() =>
                    toggleSelection(
                      selectedPresentations,
                      setSelectedPresentations,
                      presentation._id
                    )
                  }
                />
                <label htmlFor={`presentation-${presentation._id}`}>
                  {presentation.name} ({presentation.quantity}{" "}
                  {presentation.measure})
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="card-label">Categorías</label>
          <div className="categories-body">
            {categories.map((category) => (
              <div key={category._id} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`category-${category._id}`}
                  checked={selectedCategories.includes(category._id)}
                  onChange={() =>
                    toggleSelection(
                      selectedCategories,
                      setSelectedCategories,
                      category._id
                    )
                  }
                />
                <label htmlFor={`category-${category._id}`}>
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="card-label">Descripciones</label>
          {descriptions.map((description, index) => (
            <textarea
              key={index}
              value={description}
              onChange={(e) =>
                handleArrayChange(
                  descriptions,
                  setDescriptions,
                  index,
                  e.target.value
                )
              }
              placeholder={`Descripción ${index + 1}`}
              className="textarea-field"
            />
          ))}
        </div>
        <div className="form-group">
          <label className="card-label">Usos</label>
          {uses.map((use, index) => (
            <input
              key={index}
              value={use}
              onChange={(e) =>
                handleArrayChange(uses, setUses, index, e.target.value)
              }
              placeholder={`Uso ${index + 1}`}
              className="input-field"
            />
          ))}
        </div>
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
        <div className="form-group">
          <button type="submit" className="submit-button">
            Añadir producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
