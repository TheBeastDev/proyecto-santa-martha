import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/orders';

// Async Thunk for creating an order
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.post(API_URL, orderData, {
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

// Async Thunk for fetching user's orders
export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${API_URL}/my-orders`, {
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

// Async Thunk for fetching all orders (admin only)
export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
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

// Async Thunk for fetching a single order by ID
export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${API_URL}/${orderId}`, {
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

// Async Thunk for updating order status (admin only)
export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.put(
        `${API_URL}/${orderId}/status`,
        { status },
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

const initialState = {
  orders: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Local reducers will be replaced by extraReducers handling async thunks
  },
  extraReducers: (builder) => {
    builder
      // createOrder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders.push(action.payload); // Add the new order to the list
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // fetchUserOrders
      .addCase(fetchUserOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // fetchAllOrders
      .addCase(fetchAllOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // fetchOrderById
      .addCase(fetchOrderById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // If fetching a single order, we might want to store it separately or update an existing one
        // For now, we'll just assume it's part of a list update or a specific view will handle it.
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        } else {
          state.orders.push(action.payload);
        }
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // updateOrderStatus
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const index = state.orders.findIndex(order => order.id === updatedOrder.id);
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      });
  },
});

export const selectOrders = state => state.orders.orders;
export const selectOrdersStatus = state => state.orders.status;
export const selectOrdersError = state => state.orders.error;

export default ordersSlice.reducer;