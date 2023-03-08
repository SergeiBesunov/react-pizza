import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  selectedSort: `popular`,
  valueSearch: ``,
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {

    changeCategory: (state, action) => {
      state.categoryId = action.payload
    },
    changeSort: (state, action) => {
      state.selectedSort = action.payload
    },
    changeValueSearch: (state, action) => {
      state.valueSearch = action.payload
    },
    setFilters: (state, action) => {
      state.categoryId = Number(action.payload.categoryId)
      state.selectedSort = action.payload.selectedSort
    },
  },
})

export const { changeCategory, changeSort, changeValueSearch, setFilters } = filterSlice.actions

export default filterSlice.reducer