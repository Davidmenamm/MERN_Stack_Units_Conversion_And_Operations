import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    page: '/',
    openChangelog: false,
    openEndorsementsModal: false,

    selectedState: '',
    selectedCounty: '',
    selectedTownship: '',
    selectedRange: '',
    selectedCrop: '',
    selectedForm: '',

    selectedAcre: 1,
    selectedShare: 100,
    selectedCoverage: 0,

    selectedCounties: [],
    selectedForms: [],
    selectedAips: [],

    selectedAip: '',

    selectedEndorsements: {},
    selectedPPEndorsements: {},

    showPolicyFormLossChart: false,
    isCoverage: false,
    selectedPremiumCoverage: 0,

    selectedCropAPH: 0,
    selectedCropPrice: 0,

    selectedProductionPlan: '',
    showProductionPlan: false,

    selectedYear: '',
    selectedType: '',

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

    toggleOpenEndorsementsModal: (state) => {
      state.openEndorsementsModal = !state.openEndorsementsModal;
    },

    setState: (state, action) => {
      state.selectedState = action.payload;
      state.selectedCounty = '';
      state.selectedTownship = '';
      state.selectedRange = '';
      state.selectedCounties = [];
      state.selectedEndorsements = {};
      state.selectedPPEndorsements = {};
    },
    setYear: (state, action) => {
      state.selectedYear = action.payload;
    },
    setType: (state, action) => {
      state.selectedType = action.payload;
    },
    setCounty: (state, action) => {
      state.selectedCounty = action.payload;
      state.selectedTownship = '';
      state.selectedRange = '';
      state.selectedEndorsements = {};
      state.selectedPPEndorsements = {};
    },
    setTownship: (state, action) => {
      state.selectedTownship = action.payload;
      state.selectedRange = '';
      state.selectedEndorsements = {};
      state.selectedPPEndorsements = {};
    },
    setRange: (state, action) => {
      state.selectedRange = action.payload;
      state.selectedEndorsements = {};
      state.selectedPPEndorsements = {};
    },
    setCrop: (state, action) => {
      state.selectedCrop = action.payload;
      state.selectedEndorsements = {};
      state.selectedPPEndorsements = {};
    },
    setForm: (state, action) => {
      state.selectedForm = action.payload;
      state.selectedEndorsements = {};
    },
    setAcre: (state, action) => {
      state.selectedAcre = action.payload;
    },
    setShare: (state, action) => {
      state.selectedShare = action.payload;
    },
    setCoverage: (state, action) => {
      state.selectedCoverage = action.payload;
    },
    resetQuote: (state) => {
      state.selectedCrop = '';
      state.selectedForm = '';
      state.selectedAcre = 1;
      state.selectedShare = 100;
      state.selectedCoverage = 0;
    },
    setSelectedCounties: (state, action) => {
      const counties = action.payload;
      state.selectedCounties = counties.sort();
    },
    toggleSelectedForm: (state, action) => {
      const form = action.payload;
      const index = state.selectedForms.indexOf(form);
      if (index === -1) {
        state.selectedForms.push(form);
      } else {
        state.selectedForms.splice(index, 1);
      }
    },
    toggleSelectedAips: (state, action) => {
      const aip = action.payload;
      const index = state.selectedAips.indexOf(aip);
      if (index === -1) {
        state.selectedAips.push(aip);
      } else {
        state.selectedAips.splice(index, 1);
        delete state.selectedPPEndorsements[aip];
      }
    },
    changeEndorsement: (state, action) => {
      const { aip, endorsement, rate } = action.payload;
      state.selectedEndorsements[aip] = { [endorsement]: rate, ...state.selectedEndorsements[aip] };
    },
    removeEndorsement: (state, action) => {
      const { aip, endorsement } = action.payload;
      if (Object.keys(state.selectedEndorsements[aip]).length === 1) {
        delete state.selectedEndorsements[aip];
      } else {
        delete state.selectedEndorsements[aip][endorsement];
      }
    },
    changePPEndorsement: (state, action) => {
      const { aip, endorsement, rates } = action.payload;
      state.selectedPPEndorsements[aip] = { [endorsement]: rates, ...state.selectedPPEndorsements[aip] };
    },
    removePPEndorsement: (state, action) => {
      const { aip, endorsement } = action.payload;
      if (Object.keys(state.selectedPPEndorsements[aip]).length === 1) {
        delete state.selectedPPEndorsements[aip];
      } else {
        delete state.selectedPPEndorsements[aip][endorsement];
      }
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
      console.log('log', action.payload);
      state.log = action.payload;
    },
    setAip: (state, action) => {
      state.selectedAip = action.payload;
      state.selectedEndorsements = {};
    },
    togglePolicyFormLossChart: (state) => {
      state.showPolicyFormLossChart = !state.showPolicyFormLossChart;
    },
    toggleIsCoverage(state) {
      state.isCoverage = !state.isCoverage;
    },
    toggleShowProductionPlan: (state) => {
      state.showProductionPlan = !state.showProductionPlan;
    },
    setPremiumCoverage: (state, action) => {
      state.selectedPremiumCoverage = action.payload;
    },
    setCropAPH: (state, action) => {
      state.selectedCropAPH = action.payload;
    },
    setCropPrice: (state, action) => {
      state.selectedCropPrice = action.payload;
    },
    setProductionPlan: (state, action) => {
      state.selectedProductionPlan = action.payload;
      state.selectedPPEndorsements = {};
    },
  },
});

export const uiSliceActions = uiSlice.actions;
export default uiSlice.reducer;
