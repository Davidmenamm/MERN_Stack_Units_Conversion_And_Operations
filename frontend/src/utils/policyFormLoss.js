const CLA_AWARD = 70;
const CLA_ADDITIONAL = 0.5;

const DXS5_DEDUCTIBLE = 5;
const DXS5_DISAPPEAR = 25;
const DXS10_DEDUCTIBLE = 10;
const DXS10_DISAPPEAR = 50;
const DXS20_DEDUCTIBLE = 20;
const DXS20_DISAPPEAR = 50;

const DDA_DEDUCTIBLE = 10;
const DDA_DISAPPEAR = 25;
const DDA_LOSS = 20;
const DDB_DEDUCTIBLE = 20;
const DDB_DISAPPEAR = 40;
const DDB_LOSS = 30;
const DDC_DEDUCTIBLE = 30;
const DDC_DISAPPEAR = 55;
const DDC_LOSS = 40;

const D20_DEDUCTIBLE = 20;
const D20_DISAPPEAR = 70;

const COMP1_5_FACTOR = 2;
const COMP2_FACTOR = 2;
const COMP3_FACTOR = 3;
const COMP4_FACTOR = 4;

const COMP2PLUS_DEDUCTIBLE = 10;
const COMP3PLUS_DEDUCTIBLE = 7;
const COMP4PLUS_DEDUCTIBLE = 6;
const COMP_10_DEDUCTIBLE = 10;
const COMP_15_DEDUCTIBLE = 15;

const XS5_DEDUCTIBLE = 5;
const XS10_DEDUCTIBLE = 10;
const XS15_DEDUCTIBLE = 15;
const XS20_DEDUCTIBLE = 20;

const XS20IP_ADD = 1.25;
const XS15IP_ADD = 1.5;
const XS10IP_ADD = 1;

const clampPercentage = (num) => Math.min(Math.max(num, 0), 100).toFixed(1);

const calculateBSC = (agreedPercentage) => {
  if (agreedPercentage < CLA_AWARD) {
    return agreedPercentage.toFixed(1);
  }

  return clampPercentage(agreedPercentage + (agreedPercentage - CLA_AWARD) * CLA_ADDITIONAL);
};

const calculateDXS = (agreedPercentage, deductible, disappear, multiply = 1.25) => {
  if (agreedPercentage <= deductible) {
    return 0.0;
  }

  if (agreedPercentage < disappear) {
    return clampPercentage((agreedPercentage - deductible) * multiply);
  }

  return calculateBSC(agreedPercentage);
};

const calculateDD = (agreedPercentage, deductible, disappear, loss) => {
  if (agreedPercentage <= deductible) {
    return 0.0;
  }

  if (agreedPercentage <= loss) {
    return (agreedPercentage - deductible).toFixed(1);
  }

  if (agreedPercentage < disappear) {
    return (agreedPercentage - deductible + (agreedPercentage - loss) * 2).toFixed(1);
  }

  return calculateBSC(agreedPercentage);
};

const calculateComp = (agreedPercentage, factor, deductible = 5) => {
  if (agreedPercentage <= deductible) {
    return 0.0;
  }

  return clampPercentage(((agreedPercentage - deductible) * factor).toFixed(1));
};

const calculateCompPlus = (agreedPercentage, factor, deductible) => {
  if (agreedPercentage <= deductible) {
    return agreedPercentage.toFixed(1);
  }

  return calculateComp(agreedPercentage, factor);
};

const calculateXS = (agreedPercentage, deductible) => {
  if (agreedPercentage <= deductible) {
    return 0.0;
  }
  return (agreedPercentage - deductible).toFixed(1);
};

const calculateXSIP = (agreedPercentage, deductible, add) => {
  if (agreedPercentage <= CLA_AWARD) {
    return calculateXS(agreedPercentage, deductible);
  }
  return clampPercentage(Number(calculateXS(agreedPercentage, deductible)) + (agreedPercentage - CLA_AWARD) * add);
};

const calculateXSIPS = (agreedPercentage, deductible, add) => {
  if (agreedPercentage <= deductible) {
    return calculateXS(agreedPercentage, deductible);
  }
  return clampPercentage(Number(calculateXS(agreedPercentage, deductible)) * add);
};

const calculateD = (agreedPercentage, deductible, disappear, multiply = 1.4) => {
  if (agreedPercentage <= deductible) {
    return 0.0;
  }

  if (agreedPercentage < disappear) {
    return clampPercentage((agreedPercentage - deductible) * multiply);
  }

  return calculateBSC(agreedPercentage);
};

export const calculateBASIC = (i) => {
  return calculateBSC(i);
};
export const calculateDXS5 = (i) => {
  return calculateDXS(i, DXS5_DEDUCTIBLE, DXS5_DISAPPEAR);
};
export const calculateDXS10 = (i) => {
  return calculateDXS(i, DXS10_DEDUCTIBLE, DXS10_DISAPPEAR);
};
export const calculateDXS20 = (i) => {
  return calculateDXS(i, DXS20_DEDUCTIBLE, DXS20_DISAPPEAR);
};
export const calculateDDA = (i) => {
  return calculateDD(i, DDA_DEDUCTIBLE, DDA_DISAPPEAR, DDA_LOSS);
};
export const calculateDDB = (i) => {
  return calculateDD(i, DDB_DEDUCTIBLE, DDB_DISAPPEAR, DDB_LOSS);
};
export const calculateDDC = (i) => {
  return calculateDD(i, DDC_DEDUCTIBLE, DDC_DISAPPEAR, DDC_LOSS);
};
export const calculateComp1Dot5 = (i) => {
  return calculateComp(i, COMP1_5_FACTOR);
};
export const calculateComp2 = (i) => {
  return calculateComp(i, COMP2_FACTOR);
};
export const calculateComp3 = (i) => {
  return calculateComp(i, COMP3_FACTOR);
};
export const calculateComp4 = (i) => {
  return calculateComp(i, COMP4_FACTOR);
};
export const calculateComp2Plus = (i) => {
  return calculateCompPlus(i, COMP2_FACTOR, COMP2PLUS_DEDUCTIBLE);
};
export const calculateComp3Plus = (i) => {
  return calculateCompPlus(i, COMP3_FACTOR, COMP3PLUS_DEDUCTIBLE);
};
export const calculateComp4Plus = (i) => {
  return calculateCompPlus(i, COMP4_FACTOR, COMP4PLUS_DEDUCTIBLE);
};
export const calculateXS5 = (i) => {
  return calculateXS(i, XS5_DEDUCTIBLE);
};
export const calculateXS10 = (i) => {
  return calculateXS(i, XS10_DEDUCTIBLE);
};
export const calculateXS15 = (i) => {
  return calculateXS(i, XS15_DEDUCTIBLE);
};
export const calculateXS20 = (i) => {
  return calculateXS(i, XS20_DEDUCTIBLE);
};
export const calculateXS15IP = (i) => {
  return calculateXSIP(i, XS15_DEDUCTIBLE, XS15IP_ADD);
};
export const calculateXS10IP = (i) => {
  return calculateXSIP(i, XS10_DEDUCTIBLE, XS10IP_ADD);
};
export const calculateXS20IP = (i) => {
  return calculateXSIPS(i, XS20_DEDUCTIBLE, XS20IP_ADD);
};
export const calculateCOMP2D10 = (i) => {
  return calculateComp(i, COMP2_FACTOR, COMP_10_DEDUCTIBLE);
};
export const calculateCOMP2D15 = (i) => {
  return calculateComp(i, COMP2_FACTOR, COMP_15_DEDUCTIBLE);
};
export const calculateCOMP3D10 = (i) => {
  return calculateComp(i, COMP3_FACTOR, COMP_10_DEDUCTIBLE);
};
export const calculateCOMP3D15 = (i) => {
  return calculateComp(i, COMP3_FACTOR, COMP_15_DEDUCTIBLE);
};
export const calculateD20 = (i) => {
  return calculateD(i, D20_DEDUCTIBLE, D20_DISAPPEAR);
};
