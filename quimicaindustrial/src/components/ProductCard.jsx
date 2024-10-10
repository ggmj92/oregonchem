import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPresentations } from "../services/presentationService";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [presentations, setPresentations] = useState([]);
  const [site1Data, setSite1Data] = useState(null);

  useEffect(() => {
    const loadPresentations = async () => {
      try {
        const allPresentations = await fetchPresentations();
        const productPresentationIds = product.presentations;

        const productPresentations = allPresentations.filter((presentation) =>
          productPresentationIds.includes(presentation._id)
        );

        setPresentations(productPresentations);
      } catch (error) {
        console.error("Error fetching presentations:", error);
      }
    };

    // Get the data for "site1"
    if (product.siteData) {
      const site1 = product.siteData.find((data) => data.site === "site1");
      setSite1Data(site1);
    }

    if (product.presentations && product.presentations.length > 0) {
      loadPresentations();
    }
  }, [product.presentations, product.siteData]);

  return (
    <div>
      {/* Product Image for site1 */}
      {site1Data && site1Data.images && (
        <div key={product._id}>
          <img src={site1Data.images} alt={product.name} />
        </div>
      )}

      {/* Product Name */}
      <div>
        <h4>{product.name}</h4>
      </div>

      {/* Product Description and Uses for site1 */}
      {site1Data && (
        <div>
          <p>
            <strong>Descripción:</strong> {site1Data.descriptions}
          </p>
          <p>
            <strong>Usos:</strong> {site1Data.uses}
          </p>
        </div>
      )}

      {/* Available Presentations */}
      <div>
        <p>
          <strong>Presentaciones disponibles:</strong>{" "}
          {presentations.length > 0
            ? presentations.map((presentation) => presentation.name).join(", ")
            : "No hay presentaciones disponibles"}
        </p>
      </div>

      {/* Category Names */}
      <div>
        <p>
          <strong>Categorías:</strong>{" "}
          {product.categories.map((category) => category.name).join(", ")}
        </p>
      </div>

      <button onClick={() => navigate(`/productos/${product._id}`)}>Ver</button>
    </div>
  );
};

export default ProductCard;
