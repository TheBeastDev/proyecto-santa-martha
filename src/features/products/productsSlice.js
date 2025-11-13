import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      // This single thunk will be used by both public and admin.
      // The backend will decide what data to return based on the user's role.
      const token = localStorage.getItem('token');
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const response = await axios.get('/api/products', config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'No se pudieron cargar los productos.');
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.post('/api/products', productData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al crear el producto.');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const { id, ...data } = productData;
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.put(`/api/products/${id}`, data, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al actualizar el producto.');
    }
  }
);

export const archiveProduct = createAsyncThunk(
  'products/archiveProduct',
  async ({ productId, archive }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.patch(`/api/products/${productId}/archive?archive=${archive}`, {}, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al archivar el producto.');
    }
  }
);

const initialState = {
  products: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  selectedCategory: null,
  searchQuery: '',
  sortBy: 'popularity',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    clearProductsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => { state.status = 'loading'; };
    const handleRejected = (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    };
    
    builder
      .addCase(fetchProducts.pending, handlePending)
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProducts.rejected, handleRejected)
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, handleRejected)
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) { state.products[index] = action.payload; }
      })
      .addCase(updateProduct.rejected, handleRejected)
      .addCase(archiveProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) { state.products[index] = action.payload; }
      })
      .addCase(archiveProduct.rejected, handleRejected);
  },
});

export const { 
  setSelectedCategory, 
  setSearchQuery, 
  setSortBy, 
  clearProductsError 
} = productsSlice.actions;

// Selectors
export const selectProducts = (state) => state.products.products;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectSearchQuery = (state) => state.products.searchQuery;
export const selectSelectedCategory = (state) => state.products.selectedCategory;
export const selectSortBy = (state) => state.products.sortBy;

export const selectProductById = (state, productId) => 
  state.products.products.find(product => product.id === productId);

export default productsSlice.reducer;
