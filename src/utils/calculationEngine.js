export const calculateProjection = (inputs) => {
  if (!inputs || !inputs.person1) return []; // Guard against incomplete inputs
  const projection = [];
  const startYear = new Date().getFullYear();
  let currentNetWorth = inputs.initialLiquidAssets || 0;

  for (let i = 0; i < 40; i++) {
    const p1Age = inputs.person1.currentAge + i;
    const p2Age = inputs.person2.currentAge + i;

    // Simplified growth for stability
    currentNetWorth *= 1.04;

    projection.push({
      year: startYear + i,
      ages: `${p1Age} / ${p2Age}`,
      netWorth: Math.round(currentNetWorth),
    });
  }
  return projection;
};
