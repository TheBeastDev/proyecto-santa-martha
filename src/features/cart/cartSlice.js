import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/cart';

// Async Thunk for fetching the cart
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk for adding an item to the cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(
        `${API_URL}/items`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk for updating an item's quantity in the cart
export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ itemId, quantity }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.put(
        `${API_URL}/items/${itemId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk for removing an item from the cart
export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (itemId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await axios.delete(`${API_URL}/items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return itemId; // Return the ID of the removed item
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk for clearing the entire cart
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await axios.delete(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  items: [], // { product, quantity }
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Local reducers will be replaced by extraReducers handling async thunks
  },
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.cartItems; // Assuming payload is the cart object with cartItems
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // addToCart
      .addCase(addToCart.fulfilled, (state, action) => {
        const newItem = action.payload;
        const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
        if (existingItemIndex !== -1) {
          state.items[existingItemIndex] = newItem; // Update existing item
        } else {
          state.items.push(newItem); // Add new item
        }
      })
      // updateCartItem
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const existingItemIndex = state.items.findIndex(item => item.id === updatedItem.id);
        if (existingItemIndex !== -1) {
          state.items[existingItemIndex] = updatedItem;
        }
      })
      // removeCartItem
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const removedItemId = action.payload;
        state.items = state.items.filter(item => item.id !== removedItemId);
      })
      // clearCart
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const selectCartItems = state => state.cart.items;
export const selectCartStatus = state => state.cart.status;
export const selectCartError = state => state.cart.error;

export const selectTotalItems = createSelector(
  [selectCartItems],
  (items) => (items || []).reduce((total, item) => total + item.quantity, 0)
);

export const selectTotalPrice = createSelector(
  [selectCartItems],
  (items) => (items || []).reduce((total, item) => {
    if (item.product && typeof item.product.price === 'number') {
      return total + item.product.price * item.quantity;
    }
    return total;
  }, 0)
);

export default cartSlice.reducer;