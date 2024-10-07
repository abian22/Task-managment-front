// src/layout/MainLayout.js
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';

const Root = () => {
  const location = useLocation();

  // Define las rutas donde no quieres mostrar el Header
  const noHeaderRoutes = ['/signin', '/signup', '/verify'];

  // Determina si la ruta actual debería ocultar el Header
  const shouldHideHeader = noHeaderRoutes.includes(location.pathname);

  return (
    <div>
      {!shouldHideHeader && <Header />}
      <div className="app-container">
        <Outlet /> {/* Renderiza el contenido de la ruta actual */}
      </div>
    </div>
  );
};

export default Root;
