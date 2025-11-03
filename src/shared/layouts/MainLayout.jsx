import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      {/* Aquí irían el Navbar y otros componentes comunes */}
      <main>
        <Outlet />
      </main>
      {/* Aquí iría el Footer */}
    </div>
  );
};

export default MainLayout;
