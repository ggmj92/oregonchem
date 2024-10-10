import React from "react";
import CategoryData from "../services/categoryService";

const HomePage = () => {
  return (
    <>
      <div className="container">
        <h1>Química Industrial</h1>
        <h2>Venta de Productos Químicos en el Perú</h2>
        <div>
          <CategoryData />
        </div>
        <div>
          <h3>¿Quienes Somos?</h3>
          <p>
            Química Industrial es una empresa privada que forma parte de Oregon
            Chem Group cuya actividad está centrada en la venta de productos
            químicos y lubricantes industriales en el Peru para diferentes
            Industrias y particulares.
          </p>
          <h3>Insumos para Industria</h3>
          <p>
            Poseemos una gama de preservantes, Aditivos alimenticios,
            Reguladores de Acidez, Detergentes, Aceites Lubricantes, ácidos,
            Industria Textil, Industria Pesquera, entre otros.
          </p>
          <h4>
            Queremos ser la empresa líder en distribución de productos químicos
            industriales y lubricantes especiales, para ayudar en los procesos
            fabricación de las empresas con nuestros productos.
          </h4>
        </div>
      </div>
    </>
  );
};

export default HomePage;
