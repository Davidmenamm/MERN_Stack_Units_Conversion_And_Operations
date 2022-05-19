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
      const {
        pageOperation,
        pageConversion,
        pageFieldReport,
        pageProductionCalculator,
        pageHailPolicyComparison,
        pageHistoric,
        pageGlossary,
      } = action.payload;
      state.pageOperation = JSON.parse(pageOperation);
      state.pageConversion = JSON.parse(pageConversion);
      state.pageFieldReport = JSON.parse(pageFieldReport);
      state.pageProductionCalculator = JSON.parse(pageProductionCalculator);
      state.pageHailPolicyComparison = JSON.parse(pageHailPolicyComparison);
      state.pageHistoric = JSON.parse(pageHistoric);
      state.pageGlossary = JSON.parse(pageGlossary);
    },
    setInfoBanner: (state, action) => {
      state.infoBanner = action.payload;
    },
  },
});

export const pagesSliceActions = pagesSlice.actions;
export default pagesSlice.reducer;
