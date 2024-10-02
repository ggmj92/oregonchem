import React, { useState } from "react";

const PresentationForm = ({ onPresentationAdded }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("solido");
  const [measure, setMeasure] = useState("g")
  const [presentationImages, setPresentationImages] = useState([
    { file: null, previewUrl: null },
    { file: null, previewUrl: null },
    { file: null, previewUrl: null },
    { file: null, previewUrl: null },
    { file: null, previewUrl: null },
  ]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // To differentiate between success and error messages

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      const updatedImages = [...presentationImages];
      updatedImages[index] = { file, previewUrl };
      setPresentationImages(updatedImages);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/presentaciones/nueva",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            type,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(`Presentación añadida: ${data.name}`);
        setMessageType("success"); // Indicate success
        setName("");
        setType("solido");
        setMeasure("g");

        // Notify parent component that a new presentation has been added
        if (onPresentationAdded) {
          onPresentationAdded();
        }
      } else {
        setMessage("Error al añadir presentación");
        setMessageType("error"); // Indicate error
      }
    } catch (error) {
      setMessage("Error al añadir presentación");
      setMessageType("error"); // Indicate error
    }
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="type" className="card-label">
              Tipo de presentación:
            </label>
            <select
              id="type"
              value={type}
              onChange={(event) => setType(event.target.value)}
              required
              className="input-field"
            >
              <option value="solido">Sólido</option>
              <option value="liquido">Líquido</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="type" className="card-label">
              Medida:
            </label>
            <select
              id="type"
              value={type}
              onChange={(event) => setType(event.target.value)}
              required
              className="input-field"
            >
              <option value="gramos">g</option>
              <option value="kilos">kg</option>
              <option value="mililitros">ml</option>
              <option value="litros">L</option>
              <option value="galones">gal</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name" className="card-label">
              Cantidad:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="input-field"
              placeholder="Introduzca cantidad numérica"
              required
            />
          </div>

          {/* Product Images */}
          <div className="form-group">
            <label className="card-label">Imágenes</label>
            <div className="image-container">
              {presentationImages.map((imageObj, index) => (
                <div key={index} className="image-circle">
                  <label
                    htmlFor={`presentation-image-${index}`}
                    className="image-upload-label"
                  >
                    {imageObj.previewUrl ? (
                      <img
                        src={imageObj.previewUrl}
                        alt={`Presentation ${index + 1}`}
                        className="image-preview"
                      />
                    ) : (
                      <span className="plus-sign">+</span>
                    )}
                  </label>
                  <input
                    type="file"
                    id={`presentation-image-${index}`}
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
            Añadir presentación
          </button>
        </div>

        {message && (
          <p
            className={
              messageType === "success" ? "success-message" : "error-message"
            }
          >
            {message}
          </p>
        )}
      </div>
    </>
  );
};

export default PresentationForm;
