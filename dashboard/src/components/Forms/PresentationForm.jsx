import React, { useState } from "react";

const PresentationForm = ({ onPresentationAdded }) => {
  const [type, setType] = useState("solido");
  const [measure, setMeasure] = useState("g");
  const [quantity, setQuantity] = useState("");
  const [presentationImages, setPresentationImages] = useState(
    Array(5).fill({ file: null, previewUrl: null })
  );
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      const updatedImages = [...presentationImages];
      updatedImages[index] = { file, previewUrl };
      setPresentationImages(updatedImages);
    }
  };

  const renderMeasurementOptions = () => {
    if (type === "solido") {
      return (
        <>
          <option value="g">Gramos (g)</option>
          <option value="kg">Kilogramos (kg)</option>
        </>
      );
    } else if (type === "liquido") {
      return (
        <>
          <option value="ml">Mililitros (ml)</option>
          <option value="L">Litros (L)</option>
          <option value="gal">Galones (gal)</option>
        </>
      );
    }
  };

  const handleTypeChange = (event) => {
    const newType = event.target.value;
    setType(newType);

    if (newType === "solido") {
      setMeasure("g");
    } else if (newType === "liquido") {
      setMeasure("ml");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", quantity);
    formData.append("type", type); //
    formData.append("measure", measure);

    presentationImages.forEach((imageObj, index) => {
      if (imageObj.file) {
        formData.append(`site${index + 1}`, imageObj.file);
      }
    });

    try {
      const response = await fetch(
        "http://localhost:3000/presentaciones/nueva",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(`Presentación añadida: ${data.name}`);
        setMessageType("success");
      } else {
        const errorData = await response.json();
        setMessage(`Error al añadir presentación: ${errorData.message}`);
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error al añadir presentación");
      setMessageType("error");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type" className="card-label">
            Tipo de presentación:
          </label>
          <select
            id="type"
            value={type}
            onChange={handleTypeChange}
            required
            className="input-field"
          >
            <option value="solido">Sólido</option>
            <option value="liquido">Líquido</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="measure" className="card-label">
            Medida:
          </label>
          <select
            id="measure"
            value={measure}
            onChange={(event) => setMeasure(event.target.value)}
            required
            className="input-field"
          >
            {renderMeasurementOptions()}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="quantity" className="card-label">
            Cantidad:
          </label>
          <input
            type="number"
            id="quantity"
            className="input-field"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            required
            min="0"
            step="any"
          />
        </div>

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
      </form>
    </div>
  );
};

export default PresentationForm;
