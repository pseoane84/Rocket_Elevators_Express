// Full list of Rocket Elevators agents with name, email, region, rating and fee
const agents = [
  { "first_name": "Orlando", "last_name": "Perez", "email": "perez@rocket.elv", "region": "north", "rating": "95", "fee": "10000" },
  { "first_name": "Brutus", "last_name": "Konway", "email": "brutus@rocket.elv", "region": "north", "rating": "92", "fee": "9000" },
  { "first_name": "Bob", "last_name": "Boberson", "email": "bob@rocket.elv", "region": "east", "rating": "85", "fee": "10000" },
  { "first_name": "John", "last_name": "Johnson", "email": "john@rocket.elv", "region": "south", "rating": "75", "fee": "8000" },
  { "first_name": "Jeff", "last_name": "Lebow", "email": "carpet@rocket.elv", "region": "north", "rating": "92", "fee": "10000" },
  { "first_name": "Elmar", "last_name": "Fade", "email": "elmar@rocket.elv", "region": "south", "rating": "95", "fee": "10000" },
  { "first_name": "Zed", "last_name": "Roles", "email": "zebra@rocket.elv", "region": "north", "rating": "100", "fee": "4321" },
  { "first_name": "Dee", "last_name": "Omega", "email": "omega@rocket.elv", "region": "east", "rating": "78", "fee": "7000" },
  { "first_name": "Aaron", "last_name": "De Silva", "email": "aaron@rocket.elv", "region": "east", "rating": "89", "fee": "8900" },
  { "first_name": "Brian", "last_name": "Bossman", "email": "papi@rocket.elv", "region": "south", "rating": "100", "fee": "10001" },
  { "first_name": "Bob", "last_name": "Robertson", "email": "bob2@rocket.elv", "region": "east", "rating": "85", "fee": "10000" },
  { "first_name": "George", "last_name": "Cleese", "email": "monty@rocket.elv", "region": "south", "rating": "85", "fee": "5000" },
  { "first_name": "Tanim", "last_name": "Homaini", "email": "tanim@rocket.elv", "region": "south", "rating": "96", "fee": "10000" },
  { "first_name": "Roger", "last_name": "Babbel", "email": "loons@rocket.elv", "region": "north", "rating": "60", "fee": "5000" },
  { "first_name": "Zach", "last_name": "Van Den Zilch", "email": "zach@rocket.elv", "region": "north", "rating": "70", "fee": "6000" },
  { "first_name": "Al", "last_name": "Stein", "email": "relative@rocket.elv", "region": "south", "rating": "54", "fee": "4000" }
];

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
  const totalInstallCost = totalUnitCost * installRate;
  const totalCost = totalUnitCost + totalInstallCost;

  return {
    elevatorsRequired: totalElevators,
    totalCost: Number(totalCost.toFixed(2))
  };
}

// Export everything needed
module.exports = { agents, pricing, calculateResidentialQuote };
