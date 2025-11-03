import React from 'react';

const AdminLayout = ({ children }) => {
  return (
    <div>
      {/* Aquí iría un sidebar de administración */}
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
