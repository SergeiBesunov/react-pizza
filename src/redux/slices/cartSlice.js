import { createSlice } from '@reduxjs/toolkit';


const calculateThePrice = (arrayItems) => {
   return arrayItems.reduce((sum, obj) => {
      return obj.price * obj.count + sum;
   }, 0)
}

const getCartFromLS = () => {
   const data = localStorage.getItem(`cart`)
   const items = data ? JSON.parse(data) : []
   const totalPrice = calculateThePrice(items)

   return {
      items, 
      totalPrice
   }
}


const initialState = getCartFromLS()


export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItems: (state, action) => {
         const findItem = state.items.find((obj) => obj.id === action.payload.id);

         if (findItem) {
            findItem.count++;
         } else {
            state.items.push({
               ...action.payload,
               count: 1,
            });
         }

         state.totalPrice = calculateThePrice(state.items)
      },

      minusItem: (state, action) => {
         const findItem = state.items.find((obj) => obj.id === action.payload.id);

         if (findItem && findItem.count > 1) {
            findItem.count--;

            state.totalPrice = calculateThePrice(state.items)
         }
      },

      removeItem: (state, action) => {
         state.items = state.items.filter((obj) => obj.id !== action.payload.id);

         state.totalPrice = calculateThePrice(state.items)
      },

      clearCart: (state) => {
         state.items = [];
         state.totalPrice = 0;
      },

   },
});

export const { addItems, removeItem, clearCart, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
