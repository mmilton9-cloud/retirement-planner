export const initialInputs = {
  person1: {
    currentAge: 55,
    retirementAge: 65,
    lifeExpectancy: 95,
    income: 100000,
    ssStartAge: 67,
    ssBenefit: 2500, // Monthly benefit at start age
  },
  person2: {
    currentAge: 53,
    retirementAge: 63,
    lifeExpectancy: 95,
    income: 80000,
    ssStartAge: 67,
    ssBenefit: 2000, // Monthly benefit at start age
  },
  assets: {
    liquidAssets: 500000,
    ira: 750000,
    fixedAssets: [
      {
        name: "Primary Residence",
        value: 600000,
        costBasis: 300000,
        appreciation: 3.0,
        isPrimary: true,
        sellYear: 2045,
      },
    ],
  },
  assumptions: {
    inflation: 3.0,
    investmentGrowth: 7.0,
    taxRate: 20.0,
  },
  expenses: {
    monthly: 5000,
  },
  events: [
    {
      year: 2030,
      type: "one-time-expense",
      amount: 50000,
      description: "Daughter's Wedding",
    },
    {
      year: 2035,
      type: "one-time-income",
      amount: 100000,
      description: "Inheritance",
    },
  ],
};
