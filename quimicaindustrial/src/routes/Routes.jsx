import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ContactPage from "../pages/ContactPage";
import AllProducts from "../pages/AllProductsPage";
import QuoteForm from "../pages/QuoteForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/inicio" element={<HomePage />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route path="/productos" element={<AllProducts />} />
      <Route path="/cotizar" element={<QuoteForm />} />
    </Routes>
  );
};

export default AppRoutes;
