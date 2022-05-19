import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    page: '/',
    openChangelog: false,

    selectedMagnitude: 'distance',
    selectedUnitA: 'select',
    selectedUnitB: 'select',
    selectedOperator: 'select',
    selectedQuantityA: 0,
    selectedQuantityB: 0,
    log: [],
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    toggleOpenChangelog: (state) => {
      state.openChangelog = !state.openChangelog;
    },
    setSelectedMagnitude: (state, action) => {
      state.selectedMagnitude = action.payload;
    },
    setSelectedUnitA: (state, action) => {
      state.selectedUnitA = action.payload;
    },
    setSelectedUnitB: (state, action) => {
      state.selectedUnitB = action.payload;
    },
    setSelectedOperator: (state, action) => {
      state.selectedOperator = action.payload;
    },
    setSelectedQuantityA: (state, action) => {
      state.selectedQuantityA = action.payload;
    },
    setSelectedQuantityB: (state, action) => {
      state.selectedQuantityB = action.payload;
    },
    setLog: (state, action) => {
      state.log = action.payload;
    },
  },
});

export const uiSliceActions = uiSlice.actions;
export default uiSlice.reducer;
