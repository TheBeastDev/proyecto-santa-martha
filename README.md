# Panadería Santa Martha - E-commerce

Este es el repositorio del proyecto de e-commerce para la Panadería Santa Martha, una aplicación web moderna construida con React y Vite, y utilizando Redux para el manejo de estado.

## Características

- **Catálogo de Productos:** Explora una amplia variedad de productos de panadería, con filtros por categoría y búsqueda en tiempo real.
- **Carrito de Compras:** Añade productos al carrito, actualiza las cantidades y procede al checkout.
- **Autenticación de Usuarios:** Sistema de registro e inicio de sesión con rutas protegidas.
- **Panel de Administración:** Un panel de control para la gestión de productos, pedidos, usuarios y stock (solo para usuarios administradores).
- **Diseño Responsivo:** La aplicación está diseñada para funcionar en dispositivos de todos los tamaños.

## Tecnologías Utilizadas

- **Frontend:**
  - [React](https://reactjs.org/) (v19)
  - [Vite](https://vitejs.dev/)
  - [React Router](https://reactrouter.com/) (v7)
  - [Redux Toolkit](https://redux-toolkit.js.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Recharts](https://recharts.org/)
  - [Lucide React](https://lucide.dev/)

## Cómo Empezar

Sigue estos pasos para levantar el proyecto en tu máquina local.

### Prerrequisitos

- [Node.js](https://nodejs.org/en/) (v18 o superior)
- [npm](https://www.npmjs.com/)

### Instalación

1. Clona el repositorio:
   ```sh
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega al directorio del proyecto:
   ```sh
   cd santa-marta
   ```
3. Instala las dependencias:
   ```sh
   npm install
   ```

### Ejecución

Para iniciar el servidor de desarrollo, ejecuta:

```sh
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

### Demo de Autenticación

- **Usuario Cliente:** Usa cualquier correo y contraseña para registrarte o iniciar sesión.
- **Usuario Administrador:** Para acceder al panel de administración, inicia sesión con un correo que contenga la palabra `admin` (ej. `admin@test.com`).
