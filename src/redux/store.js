import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'
import cartReducer from './slices/cartSlice'
import pizzasReducer from './slices/pizzasSlice'

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    cart: cartReducer,
    pizzas: pizzasReducer
  },
})