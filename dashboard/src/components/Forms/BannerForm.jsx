import React, { useState } from "react";

const BannerForm = () => {
  const [name, setName] = useState("");
  const [site, setSite] = useState("quimica industrial");
  const [bannerImage, setBannerImage] = useState([
    { file: null, previewUrl: null },
  ]);

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      const updatedImages = [...bannerImage];
      updatedImages[index] = { file, previewUrl };
      setBannerImage(updatedImages);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    const formData = new FormData();
    formData.append("name", name);

    try {
      const response = await fetch("http://localhost:3000/banners/nueva", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Banner created successfully");
        if (onBannerAdded) onBannerAdded();
        if (onClose) onClose();
      } else {
        console.error("Error creating banner");
      }
    } catch (error) {
      console.error("Error submitting banner", error);
    }
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="card-label">
              Título:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="input-field"
              placeholder="Introduzca el título del banner"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="site" className="card-label">
              Para la web:
            </label>
            <select
              id="site"
              value={site}
              onChange={(event) => setSite(event.target.value)}
              required
              className="input-field"
            >
              <option value="web1">Qúimica Industrial</option>
              <option value="web2">Web 2</option>
              <option value="web3">Web 3</option>
              <option value="web4">Web 4</option>
              <option value="web5">Web 5</option>
            </select>
          </div>

          <div className="form-group">
            <label className="card-label">Imágen</label>
            <div className="image-container">
              {bannerImage.map((imageObj, index) => (
                <div key={index} className="image-circle">
                  <label className="image-upload-label">
                    {imageObj.previewUrl ? (
                      <img
                        src={imageObj.previewUrl}
                        className="image-preview"
                      />
                    ) : (
                      <span className="plus-sign">+</span>
                    )}
                  </label>
                  <input
                    type="file"
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
            Añadir banner
          </button>
        </div>
      </div>
    </>
  );
};

export default BannerForm;
