/*******************************************************
 * Project: Rocket Elevators - Module 4 API Setup
 * File: app.js
 * Description: Express app with routes and configuration
 * Author: Pablo Seoane
 * Date: 7/4/72025
 *******************************************************/

/**
 * Glossary:
 * - Express: Web framework for Node.js to handle server and routes.
 * - app.use(express.json()): Middleware to parse JSON bodies in requests.
 * - req (request): Info sent by the client.
 * - res (response): Info sent back to the client.
 * - Endpoint: A route where the server listens (e.g., /agent).
 */

/**
 * Index (Table of Contents):
 * 1. SETUP SECTION 
 * 2. START SERVER 
 * 3. ROUTES: AGENTS MOCK 
 *    - GET /agent
 *    - POST /create
 * 4. ROUTES: MODULE 4 ASSIGNMENTS 
 *    - GET /hello
 *    - GET /status
 *    - GET /error
 *    - GET /email-list
 *    - POST /contact-us
 *    - GET /region-avg
 *    - GET /calc-residential
 */


/* ---------------------------- 1. SETUP SECTION ---------------------------- */

const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

const port = 3000;

/* ---------------------------- 2. START SERVER ---------------------------- */

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

/* ------------------------ 3. ROUTES: AGENTS MOCK ------------------------ */

/**
 * GET /agent
 * Returns a placeholder list of agents
 */
app.get('/agent', (req, res) => {
  res.send('List of agents (simulated)');
});

/**
 * POST /create
 * Receives new agent data and responds with confirmation
 */
app.post('/create', (req, res) => {
  const newAgent = req.body;
  res.send(`Agent created: ${JSON.stringify(newAgent)}`);
});


/* ------------------------ 4. ROUTES: MODULE 4 ASSIGNMENTS ------------------------ */

/**
 * GET /hello
 * Returns "Hello World!"
 */
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

/**
 * GET /status
 * Returns a message with the current port
 */
app.get('/status', (req, res) => {
  res.send(`Server is running on port ${port}`);
});

/**
 * GET /error
 * Simulates an error response
 */
app.get('/error', (req, res) => {
  try {
    throw new Error('Something went wrong!');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /email-list
 * Returns a comma-separated list of agent emails
 */
app.get('/email-list', async (req, res) => {
  try {
    const response = await fetch('http://99.79.77.144:3000/api/agents');
    const agents = await response.json();

    const emails = agents.map(agent => agent.email).join(',');
    res.send(emails);
  } catch (error) {
    console.error('Error fetching agents:', error.message);
    res.status(500).send('Error fetching agent data.');
  }
});


/**
 * POST /contact-us
 * Accepts a first_name, last_name, and message from user input
 */
app.post('/contact-us', (req, res) => {
  const { first_name, last_name, message } = req.body;

  if (!first_name || !last_name || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  res.json({
    success: true,
    message: `Thank you for your message, ${first_name} ${last_name}.`
  });
});

/**
 * GET /region-avg?region=North
 * Returns the average rating and fee for agents in a region
 */
const detailedAgents = [
  { name: 'Alice', region: 'North', rating: 4.5, fee: 200 },
  { name: 'Bob', region: 'North', rating: 4.0, fee: 250 },
  { name: 'Charlie', region: 'South', rating: 3.8, fee: 180 }
];

app.get('/region-avg', (req, res) => {
  const region = req.query.region;

  if (!region) {
    return res.status(400).json({ error: 'Region is required as query parameter' });
  }

  const filtered = detailedAgents.filter(agent => agent.region === region);

  if (filtered.length === 0) {
    return res.status(404).json({ error: 'No agents found in that region' });
  }

  const avgRating = filtered.reduce((sum, a) => sum + a.rating, 0) / filtered.length;
  const avgFee = filtered.reduce((sum, a) => sum + a.fee, 0) / filtered.length;

  res.json({
    region,
    averageRating: avgRating,
    averageFee: avgFee
  });
});

/**
 * GET /calc-residential?apartments=80&floors=10
 * Calculates number of elevators and total cost
 */
app.get('/calc-residential', (req, res) => {
  const { apartments, floors } = req.query;

  const numApartments = parseInt(apartments);
  const numFloors = parseInt(floors);

  if (isNaN(numApartments) || isNaN(numFloors)) {
    return res.status(400).json({ error: 'Both apartments and floors must be numbers' });
  }

  const elevatorsPerColumn = Math.ceil(numApartments / numFloors / 6);
  const numColumns = Math.ceil(numFloors / 20);
  const totalElevators = elevatorsPerColumn * numColumns;

  const unitPrice = 7565;
  const totalCost = totalElevators * unitPrice;

  res.json({
    totalElevators,
    totalCost
  });
});

