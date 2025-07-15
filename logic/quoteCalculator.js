// Pricing configuration for residential elevators
const pricing = {
  standard: { unitPrice: 7565, installRate: 0.10 },
  premium: { unitPrice: 12345, installRate: 0.13 },
  excelium: { unitPrice: 15400, installRate: 0.16 }
};

// Business logic for calculating residential elevator quotes
function calculateResidentialQuote(apartments, floors, tier) {
  // Validate tier
  if (!pricing[tier]) {
    throw new Error('Invalid tier specified. Must be standard, premium, or excelium.');
  }

  // Validate numbers
  if (!Number.isInteger(apartments) || !Number.isInteger(floors)) {
    throw new Error('Apartments and floors must be integers.');
  }

  if (apartments <= 0 || floors <= 0) {
    throw new Error('Apartments and floors must be greater than zero.');
  }

  // Calculate elevators required
  const apartmentsPerFloor = apartments / floors;
  const elevatorsPerColumn = Math.ceil(apartmentsPerFloor / 6);
  const numColumns = Math.ceil(floors / 20);
  const totalElevators = elevatorsPerColumn * numColumns;

  // Get pricing for selected tier
  const { unitPrice, installRate } = pricing[tier];

  // Calculate costs
  const totalUnitCost = totalElevators * unitPrice;
  const totalI
