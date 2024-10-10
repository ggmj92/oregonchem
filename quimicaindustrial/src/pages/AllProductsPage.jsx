import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/productService";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="container">
        <h1>Catálogo de Nuestros Productos</h1>
        <div>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
