class CalculationEngine {
  static calculate(inputs) {
    const projection = [];
    let liquidAssets = inputs.assets.liquidAssets;
    let ira = inputs.assets.ira;

    const maxLifeExpectancy = Math.max(
      inputs.person1.lifeExpectancy,
      inputs.person2.lifeExpectancy
    );
    const startYear = new Date().getFullYear();
    const projectionYears =
      maxLifeExpectancy -
      Math.min(inputs.person1.currentAge, inputs.person2.currentAge);

    for (let i = 0; i < projectionYears; i++) {
      const currentYear = startYear + i;
      const p1Age = inputs.person1.currentAge + i;
      const p2Age = inputs.person2.currentAge + i;

      if (
        p1Age > inputs.person1.lifeExpectancy &&
        p2Age > inputs.person2.lifeExpectancy
      )
        break;

      const inflationFactor = Math.pow(
        1 + inputs.assumptions.inflation / 100,
        i
      );

      // --- Income ---
      const p1JobIncome =
        p1Age < inputs.person1.retirementAge ? inputs.person1.income : 0;
      const p2JobIncome =
        p2Age < inputs.person2.retirementAge ? inputs.person2.income : 0;
      const p1SS =
        p1Age >= inputs.person1.ssStartAge
          ? inputs.person1.ssBenefit * 12 * inflationFactor
          : 0;
      const p2SS =
        p2Age >= inputs.person2.ssStartAge
          ? inputs.person2.ssBenefit * 12 * inflationFactor
          : 0;
      const grossIncome = p1JobIncome + p2JobIncome + p1SS + p2SS;

      // --- Expenses & Events ---
      const annualExpenses = inputs.expenses.monthly * 12 * inflationFactor;
      const yearEvents = inputs.events.filter((e) => e.year === currentYear);
      const netEvents = yearEvents.reduce(
        (acc, e) => acc + (e.type === "one-time-income" ? e.amount : -e.amount),
        0
      );

      // --- Taxes & Cash Flow ---
      const taxes = grossIncome * (inputs.assumptions.taxRate / 100);
      const netIncome = grossIncome - taxes;
      const discretionary = netIncome - annualExpenses + netEvents;

      // --- Asset Growth & Net Worth ---
      const startOfYearNetWorth = liquidAssets + ira;
      const investmentGrowth =
        startOfYearNetWorth * (inputs.assumptions.investmentGrowth / 100);

      // Deficit handling: pull from liquid assets first, then IRA
      let finalLiquidAssets = liquidAssets;
      let finalIra = ira;

      if (discretionary < 0) {
        finalLiquidAssets += discretionary; // discretionary is negative
        if (finalLiquidAssets < 0) {
          finalIra += finalLiquidAssets; // pull remainder from IRA
          finalLiquidAssets = 0;
        }
      } else {
        finalLiquidAssets += discretionary;
      }

      // Apply growth to remaining balances
      finalLiquidAssets *= 1 + inputs.assumptions.investmentGrowth / 100;
      finalIra *= 1 + inputs.assumptions.investmentGrowth / 100;

      liquidAssets = finalLiquidAssets > 0 ? finalLiquidAssets : 0;
      ira = finalIra > 0 ? finalIra : 0;

      const endOfYearNetWorth = liquidAssets + ira;

      const inflationAdjustment = Math.pow(
        1 + inputs.assumptions.inflation / 100,
        i + 1
      );

      projection.push({
        year: currentYear,
        ages: `${p1Age} / ${p2Age}`,
        netWorth: Math.round(endOfYearNetWorth),
        netWorthTodays: Math.round(endOfYearNetWorth / inflationAdjustment),
        discretionary: Math.round(discretionary),
        discretionaryTodays: Math.round(discretionary / inflationAdjustment),
        events: netEvents,
        totalIRA: Math.round(ira),
        // For Details View
        startOfYearNetWorth: Math.round(startOfYearNetWorth),
        investmentGrowth: Math.round(investmentGrowth),
        grossIncome: Math.round(grossIncome),
        taxes: Math.round(taxes),
        expenses: Math.round(annualExpenses),
      });
    }

    return projection;
  }
}

export default CalculationEngine;
