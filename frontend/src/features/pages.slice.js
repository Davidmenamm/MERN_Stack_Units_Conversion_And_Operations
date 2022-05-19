import { createSlice } from '@reduxjs/toolkit';

const pagesSlice = createSlice({
  name: 'pages',
  initialState: {
    pageOperation: true,
    pageConversion: true,
    pageFieldReport: true,
    pageProductionCalculator: true,
    pageHailPolicyComparison: true,
    pageHistoric: true,
    pageGlossary: true,
    infoBanner: '',
  },
  reducers: {
    setPageStatus: (state, action) => {
      const { pageOperation, pageConversion } = action.payload;
      state.pageOperation = JSON.parse(pageOperation);
      state.pageConversion = JSON.parse(pageConversion);
    },
    setInfoBanner: (state, action) => {
      state.infoBanner = action.payload;
    },
  },
});

export const pagesSliceActions = pagesSlice.actions;
export default pagesSlice.reducer;
