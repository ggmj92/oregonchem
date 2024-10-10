import React, { useState } from "react";

const QuoteForm = () => {
  const [selectedContactMethod, setSelectedContactMethod] = useState("");
  return (
    <>
      <h1>Formulario de Cotización</h1>
      <div className="container">
        <form action="submit" className="quote-form">
          <div className="product-section">
            <input type="text" placeholder="Producto" />
            <select name="" id="">
              <option value="presentation">Presentación</option>
            </select>
            <input type="number" placeholder="Volumen" />
            <select name="" id="" placeholder="Frecuencia">
              <option value="">Única Compra</option>
              <option value="">Quincenal</option>
              <option value="">Mensual</option>
              <option value="">Bimestral</option>
              <option value="">Trimestral</option>
            </select>
            <button>Agregard productos +</button>
          </div>
          <div className="client-section">
            
          </div>
        </form>
      </div>
    </>
  );
};

export default QuoteForm;
