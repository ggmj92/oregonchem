import React, { useState } from "react";

const CategoryForm = ({ onCategoryAdded, onClose }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImages, setCategoryImages] = useState([
    { file: null, previewUrl: null },
    { file: null, previewUrl: null },
    { file: null, previewUrl: null },
    { file: null, previewUrl: null },
    { file: null, previewUrl: null },
  ]);

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      const updatedImages = [...categoryImages];
      updatedImages[index] = { file, previewUrl };
      setCategoryImages(updatedImages);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    const formData = new FormData();
    formData.append("name", categoryName);

    categoryImages.forEach((imageObj, index) => {
      if (imageObj.file) formData.append(`site${index + 1}`, imageObj.file);
    });

    try {
      const response = await fetch("http://localhost:3000/categorias/nueva", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Category created successfully");
        if (onCategoryAdded) onCategoryAdded();
        if (onClose) onClose();
      } else {
        console.error("Error creating category");
      }
    } catch (error) {
      console.error("Error submitting category", error);
    }
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category-name" className="card-label">
              Nombre de Categoría
            </label>
            <input
              type="text"
              id="category-name"
              className="input-field"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Introduzca nombre de la nueva categoría"
              required
            />
          </div>

          <div className="form-group">
            <label className="card-label">Imágenes</label>
            <div className="image-container">
              {categoryImages.map((imageObj, index) => (
                <div key={index} className="image-circle">
                  <label htmlFor={`category-image-${index}`}>
                    {imageObj.previewUrl ? (
                      <img
                        src={imageObj.previewUrl}
                        alt={`Category ${index + 1}`}
                        className="image-preview"
                      />
                    ) : (
                      <span className="plus-sign">+</span>
                    )}
                  </label>
                  <input
                    type="file"
                    id={`category-image-${index}`}
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
            Añadir categoría
          </button>
        </div>
      </div>
    </>
  );
};

export default CategoryForm;
