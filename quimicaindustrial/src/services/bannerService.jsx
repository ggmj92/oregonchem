import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BannerData = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch("http://localhost:3000/banners");
        const data = await response.json();
        console.log(data);
        setBanners(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  if (loading) return <div>Cargando banners...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div>
        <h1>Banners</h1>
        <ul>
          {banners.map((banner) => (
            <li key={banner._id}>{banner.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BannerData;