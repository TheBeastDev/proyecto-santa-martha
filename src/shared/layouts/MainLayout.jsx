import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div>
      {/* Aquí irían el Navbar y otros componentes comunes */}
      <main>{children}</main>
      {/* Aquí iría el Footer */}
    </div>
  );
};

export default MainLayout;
