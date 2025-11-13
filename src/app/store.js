import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@features/auth/authSlice';
import productsReducer from '@features/products/productsSlice';
import cartReducer from '@features/cart/cartSlice';
import ordersReducer from '@features/orders/ordersSlice';
import notificationsReducer from '@features/notifications/notificationsSlice';
import categoriesReducer from '@features/categories/categoriesSlice';
import usersReducer from '@features/admin/users/usersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    notifications: notificationsReducer,
    categories: categoriesReducer,
    users: usersReducer,
  },
});
