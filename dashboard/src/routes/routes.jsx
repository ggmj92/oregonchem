import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Products from "../pages/Products";
import Categories from "../pages/Categories";
import Presentations from "../pages/Presentations";
import Banners from "../pages/Banners";
import QuimicaIndustrial from "../pages/sites/QuimicaIndustrial";
import Site2 from "../pages/sites/Site2";
import Site3 from "../pages/sites/Site3";
import Site4 from "../pages/sites/Site4";
import Site5 from "../pages/sites/Site5";
import Settings from "../pages/Settings";
import PrivateRoute from "../contexts/PrivateRoute";

function App() {
  const { userLoggedIn } = useAuth();

  console.log("Routes - User Logged In:", userLoggedIn);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} />

      {userLoggedIn ? (
        <>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/productos"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />
          <Route
            path="/categorias"
            element={
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            }
          />
          <Route
            path="/presentaciones"
            element={
              <PrivateRoute>
                <Presentations />
              </PrivateRoute>
            }
          />
          <Route
            path="/banners"
            element={
              <PrivateRoute>
                <Banners />
              </PrivateRoute>
            }
          />
          <Route
            path="/quimica_industrial"
            element={
              <PrivateRoute>
                <QuimicaIndustrial />
              </PrivateRoute>
            }
          />
          <Route
            path="/site2"
            element={
              <PrivateRoute>
                <Site2 />
              </PrivateRoute>
            }
          />
          <Route
            path="/site3"
            element={
              <PrivateRoute>
                <Site3 />
              </PrivateRoute>
            }
          />
          <Route
            path="/site4"
            element={
              <PrivateRoute>
                <Site4 />
              </PrivateRoute>
            }
          />
          <Route
            path="/site5"
            element={
              <PrivateRoute>
                <Site5 />
              </PrivateRoute>
            }
          />
          <Route
            path="/ajustes"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

export default App;
