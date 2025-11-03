import React from 'react';
import { Counter } from '@features/counter/Counter';

const HomePage = () => {
  return (
    <div className="text-center p-8">
      <h1 className="text-3xl font-bold">Página de Inicio</h1>
      <p className="my-4">Bienvenido a la Panadería Santa Marta.</p>
      <div className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Demo de Redux Toolkit</h2>
        <Counter />
      </div>
    </div>
  );
};

export default HomePage;
