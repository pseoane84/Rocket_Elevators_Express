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
* 3. PRACTICE ROUTES (Not part of final deliverable)
*    - GET /agent
*    - POST /create
* 4. ROUTES: MODULE 4 ASSIGNMENTS 
*    - GET /hello
*    - GET /status
*    - GET /error
*    - GET /email-list
*    - GET /region-avg
*    - GET /calc-residential
*    - POST /contact-us
*/

/* ---------------------------- 1. SETUP SECTION ---------------------------- */

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');

// ✅ Import both the agents list and the calculation logic from a single file
const { agents, pricing, calculateResidentialQuote } = require('./data/agentsAndPricing');

const app = express();
app.use(express.json());


/* ---------------------------- 2. START SERVER ---------------------------- */

// Use port from .env file or default to 3000
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

/* ------------------------ 3. PRACTICE ROUTES (Not part of final deliverable) ------------------------ */

/**
* GET /agent
* Placeholder endpoint used during initial Express practice.
*/
// app.get('/agent', (req, res) => {
//   res.send('List of agents (simulated)');
// });

/**
* POST /create
* Placeholder endpoint used during initial POST testing in Postman.
*/
// app.post('/create', (req, res) => {
//   const newAgent = req.body;
//   res.json({
//     message: 'Agent created successfully',
//     agent: newAgent
//   });
// });


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
* GET /email-list
* Returns a comma-separated list of agent emails 
* Example: "perez@rocket.elv,brutus@rocket.elv,..."
* URL: http://localhost:3000/email-list
*/

app.get('/email-list', (req, res) => {
  try {
    const emails = agents.map(agent => agent.email).join(',');
    res.send(emails);
  } catch (error) {
    console.error('Error loading agent emails:', error.message);
    res.status(500).send('Error processing agent email list.');
  }
});

/**
* GET /region-avg
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
/**
 * GET /calc-residential
 * Calculates number of elevators and total cost based on tier
 *
 * Example valid URLs:
 *   - http://localhost:3000/calc-residential?apartments=80&floors=10&tier=standard
 *   - http://localhost:3000/calc-residential?apartments=100&floors=20&tier=premium
 *   - http://localhost:3000/calc-residential?apartments=150&floors=30&tier=excelium
 *
 * Example invalid URLs:
 *   - http://localhost:3000/calc-residential?apartments=80&floors=10&tier=luxury  (invalid tier)
 *   - http://localhost:3000/calc-residential?apartments=abc&floors=10&tier=standard (apartments not a number)
 *   - http://localhost:3000/calc-residential?apartments=80&floors=10.5&tier=standard (floors not an integer)
 *   - http://localhost:3000/calc-residential?apartments=0&floors=-5&tier=standard (values must be > 0)
 */

app.get('/calc-residential', (req, res) => {
  const { apartments, floors, tier } = req.query;

  // Convert inputs
  const numApartments = Number(apartments);
  const numFloors = Number(floors);

  // 1. Validate that they are valid numbers
  if (isNaN(numApartments) || isNaN(numFloors)) {
    return res.status(400).json({ error: 'Apartments and floors must be valid numbers.' });
  }

  // 2. Validate that they are integers (no decimals)
  if (!Number.isInteger(numApartments) || !Number.isInteger(numFloors)) {
    return res.status(400).json({ error: 'Apartments and floors must be integers.' });
  }

  // 3. Validate positive values
  if (numApartments <= 0 || numFloors <= 0) {
    return res.status(400).json({ error: 'Apartments and floors must be greater than zero.' });
  }

  // 4. Validate tier only AFTER numbers are correct
  if (!tier || !pricing[tier]) {
    return res.status(400).json({
      error: 'Invalid or missing tier. Must be standard, premium, or excelium.'
    });
  }

  try {
    const result = calculateResidentialQuote(numApartments, numFloors, tier);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



 /**
 * POST /contact-us
 * Accepts first_name, last_name, and message from the user
 * Logs the full request and responds with recognition of the sender
 *
 * Example usage:
 *  URL: http://localhost:3000/contact-us
 *  Method: POST
 *  Body (raw JSON):
 *  {
 *    "first_name": "Pablo",
 *    "last_name": "Seoane",
 *    "message": "Testing the POST request"
 *  }
 */
app.post('/contact-us', (req, res) => {
  const { first_name, last_name, message } = req.body;

  // Log the full request body to the console
  console.log('📩 New Contact Us Submission:', req.body);

  // Basic validation
  if (!first_name || !last_name || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Respond recognizing the sender
  res.json({
    success: true,
    received: req.body,
    message: `Thank you for your message, ${first_name} ${last_name}.`
  });
});
