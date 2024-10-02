import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/oregonchemlogo.png";
import { IoClose, IoMenu } from "react-icons/io5";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="nav">
        <div className="nav__logo">
          <NavLink to="/">
            <img src={logo} alt="OregonChemLogo" />
          </NavLink>
        </div>
        <div className={`nav__menu ${menuOpen ? "active" : ""}`}>
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/dashboard" className="nav__link">
                Inicio
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/productos" className="nav__link">
                Productos
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/categorias" className="nav__link">
                Categorías
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/presentaciones" className="nav__link">
                Presentaciones
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/banners" className="nav__link">
                Banners
              </NavLink>
            </li>
            {/* <li className="nav__item">
              <NavLink to="" className="nav__link">
                Páginas
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/ajustes" className="nav__link">
                Ajustes
              </NavLink>
            </li> */}
            <li className="nav__item">
              <button className="nav__link logout">Logout</button>
            </li>
          </ul>
          <div className="nav__close" onClick={toggleMenu}>
            <IoClose />
          </div>
        </div>
        <div className="nav__toggle" onClick={toggleMenu}>
          <IoMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
