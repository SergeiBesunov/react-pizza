import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
   items: [],
   status: `loading`  // loading | success | error
};

 export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async (params) => {
        const {order, sortBy, category} = params
        const res = await axios.get(
            `https://63e8a5eab120461c6be38060.mockapi.io/PizzasList?${category}${`&sortBy=${sortBy}`}${`&order=${order}`}`
        );
      return res.data
    }
  )


export const pizzasSlice = createSlice({
   name: 'pizzas',
   initialState,
   reducers: {
      setPizzas: (state, action) => {
        state.items = action.payload
      },
   },
   extraReducers: {
    [fetchPizzas.pending]: (state) => {
        state.items = []
       state.status = `loading`
    },
    [fetchPizzas.fulfilled]: (state, action) => {
        state.items = action.payload
        state.status = `success`
    },
    [fetchPizzas.rejected]: (state, action) => {
        state.items = []
        state.status = `error`
    },
  },
});

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;