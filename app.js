/*******************************************************
 * Project: Rocket Elevators - Module 4 API Setup
 * File: app.js
 * Description: Express app with routes and configuration
 * Author: Pablo Seoane
 * Date: 7/4/2025
 *******************************************************/

/**
 * Glossary:
 * - Express: Web framework for Node.js to handle server and routes.
 * - app.use(express.json()): Middleware to parse JSON bodies in requests.
 * - req (request): Info sent by the client.
 * - res (response): Info sent back to the client.
 * - Endpoint: A route where the server listens (e.g., /agent).
 * - Query parameter: Value passed in URL like ?region=North
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

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');
const detailedAgents = require('./data/agents');
const { calculateResidentialQuote } = require('./logic/quoteCalculator');

const app = express();
app.use(express.json());


/* ---------------------------- 2. START SERVER ---------------------------- */

// Use port from .env file or default to 3000
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

/* ------------------------ 3. ROUTES: AGENTS MOCK ------------------------ */

/**
 * GET /agent
 * Returns a placeholder list of agents
 * http://localhost:3000/agent
 */
app.get('/agent', (req, res) => {
  res.send('List of agents (simulated)');
});

/**
 * POST /create
 * Receives new agent data and responds with confirmation
 * http://localhost:3000/create
 * In the Body section:
 * Select raw
 * Change the format to JSON
 * Paste the following content:
 * {
 * "name": "Laura Sanchez",
 * "email": "laura@example.com",
 * "region": "West",
 * "rating": 4.8,
 * "fee": 300
 * }
 */
app.post('/create', (req, res) => {
  const newAgent = req.body;
  res.json({
    message: 'Agent created successfully',
    agent: newAgent
  });
});

/* ------------------------ 4. ROUTES: MODULE 4 ASSIGNMENTS ------------------------ */

/**
 * GET /hello
 * Returns "Hello World!" 
 * http://localhost:3000/hello
 */
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

/**
 * GET /status
 * Returns a message with the current port and environment
 * Example response: "Server is running on port 3000 in local environment"
 * URL: http://localhost:3000/status
 */
app.get('/status', (req, res) => {
  res.send(`Server is running on port ${port} in ${process.env.ENVIRONMENT} environment`);
});

/**
 * GET /error
 * Simulates an error response 
 * http://localhost:3000/error
 */
app.get('/error', (req, res) => {
  try {
    throw new Error('Something went wrong!');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
/**
 * GET /email-list
 * Returns a comma-separated list of agent emails 
 * Example: "perez@rocket.elv,brutus@rocket.elv,..."
 * URL: http://localhost:3000/email-list
 */
app.get('/email-list', (req, res) => {
  try {
    const agents = require('./data/agents');
    const emails = agents.map(agent => agent.email).join(',');
    res.send(emails);
  } catch (error) {
    console.error('Error loading agent emails:', error.message);
    res.status(500).send('Error processing agent email list.');
  }
});


/**
 * POST /contact-us
 * Accepts a first_name, last_name, and message from user input
 * Select POST
 * URL: http://localhost:3000/contact-us
 * In the Body section:
 * Select raw
 * Change the format to JSON
 * Paste the following content:
 * {
 *   "first_name": "Pablo",
 *   "last_name": "Seoane",
 *   "message": "Testing the POST request"
 * }
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
 * GET /region-avg?region={region}
 * Returns the average rating and fee for agents in the given region.
 * If no agents are found, returns an error message.
 *
 * Example valid URLs:
 *  - http://localhost:3000/region-avg?region=north
 *  - http://localhost:3000/region-avg?region=east
 *  - http://localhost:3000/region-avg?region=south
 * Example invalid URL:
 *  - http://localhost:3000/region-avg?region=west
 */

app.get('/region-avg', (req, res) => {
  const regionParam = req.query.region;
  if (!regionParam) {
    return res.status(400).json({ error: 'Region is required as query parameter' });
  }

  const regionLower = regionParam.toLowerCase();
  const agents = require('./data/agents');
  const filtered = agents.filter(a => a.region.toLowerCase() === regionLower);

  if (filtered.length === 0) {
    return res.status(404).json({
      error: `No agents found in the supplied region (${regionParam}).`
    });
  }

  const totalRating = filtered.reduce((sum, a) => sum + parseFloat(a.rating || 0), 0);
  const totalFee = filtered.reduce((sum, a) => sum + parseFloat(a.fee || 0), 0);
  const avgRating = totalRating / filtered.length;
  const avgFee = totalFee / filtered.length;

  res.json({
    region: regionParam,
    averageRating: Number(avgRating.toFixed(2)),
    averageFee: Number(avgFee.toFixed(2))
  });
});

/**
 * GET /calc-residential?apartments=80&floors=10
 * Calculates number of elevators and total cost
 * http://localhost:3000/calc-residential?apartments=80&floors=10
 * Required parameters: apartments, floors
 */
app.get('/calc-residential', (req, res) => {
  const { apartments, floors } = req.query;

  const numApartments = parseInt(apartments);
  const numFloors = parseInt(floors);

  if (isNaN(numApartments) || isNaN(numFloors)) {
    return res.status(400).json({ error: 'Both apartments and floors must be numbers' });
  }

  const result = calculateResidentialQuote(numApartments, numFloors);
  res.json(result);
});

