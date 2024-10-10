export const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/productos");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
