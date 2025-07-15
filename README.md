# Rocket_Elevators_Express - Module 4 API (Express.js)

**Author:** Pablo Seoane  
**Client:** Rocket Elevators  
**Date:** July 2025

---

## Part 1 - Client Overview

Rocket Elevators is an elevator company looking to modernize its internal tools. While they are experts in manufacturing and selling elevators, they are not familiar with backend programming.

This project simulates what a backend API would look like for their future internal systems. Our goal is to show how this technology can support their daily operations — from quote generation to regional data insights.

---

## Why We Chose Node.js + Express.js

We selected **Node.js with Express.js** as the core technology for the backend because it's modern, fast, and reliable — ideal for building scalable web services.

- **Node.js** lets us run JavaScript on the server side. It's perfect for building applications that respond quickly to many users.
- **Express.js** is a framework that helps organize our code and manage routes like `/contact-us`, `/calc-residential`, or `/region-avg`.

This combination allows for:

1. **Fast development** and easy iteration based on client feedback.
2. **Scalability** — the system can grow as Rocket Elevators grows.
3. **Clean communication** — well-structured code that future developers can understand and maintain.
4. **Single language stack** — JavaScript is used for both frontend and backend, reducing complexity.

---

## Example Use Case

> Imagine an agent is speaking with a potential client and needs a quick residential quote. By sending a request to our backend route `/calc-residential`, the server instantly calculates the number of elevators needed and the total cost — with no human error or delay.

---

## Summary of Routes

| Route             | Method | Purpose                             |
|------------------|--------|-------------------------------------|
| `/hello`         | GET    | Test connection                     |
| `/status`        | GET    | Returns server status               |
| `/error`         | GET    | Simulates a failed request          |
| `/email-list`    | GET    | Returns agent email list            |
| `/region-avg`    | GET    | Returns average by region           |
| `/contact-us`    | POST   | Stores contact form data            |
| `/calc-residential` | POST | Calculates residential quote        |

These routes simulate core business logic that will eventually connect to real databases and frontend systems.

---

# Part 2 - Developer Documentation (For Technical Teams) 

## What is Node.js? 
Node.js is a tool that allows us to run JavaScript outside of a web browser. Instead of using it to make websites interactive (like clicking buttons), we use it to build servers—programs that can handle requests from users and send back information, like elevator data.

It’s fast, reliable, and perfect for real-time operations, like handling customer inquiries or processing elevator quotes instantly.

It's used to build backend applications like web servers or tools that interact with files and databases.

---

## What is Express? 
Express is a framework built on top of Node.js that helps us organize our code better. Think of Express like a well-organized toolkit—it gives us shortcuts and structure to build our server quickly and efficiently.

With Express, we can:

- Create clear and clean routes (like pages) for each task (ex: /contact-us, /calc-residential)

- Handle requests and send back responses easily

- Manage incoming data in a secure and structured way

---

## What is dotenv (for environment variables)
dotenv is a Node.js package that loads environment variables from a .env file into process.env. It helps keep sensitive information like ports, database URLs, or API keys out of your source code. This is useful for maintaining clean code and secure configurations.

---

## What is Postman 
Postman is a popular tool for testing REST APIs. It allows you to easily send different types of HTTP requests (GET, POST, etc.) to your server and view the responses. It’s great for debugging and making sure your API routes work as expected.

---

## Project Structure

Rocket_Elevators_Express/
│
├── app.js ←   # Main application file with all route declarations
├── .env   ←   # Stores environment variables securely. (e.g., PORT=3000)
├── data/
│ └── agents.js ←   # Contains static agent data used for region averaging
│
├── logic/
│ └── quoteCalculator.js ←  # Contains calculation logic for residential quotes

---

## Technologies Used

- **Node.js** — Allows JavaScript to run on the server side.
- **Express.js** — A lightweight framework for building web servers and APIs.
- **dotenv** — Loads environment variables from a `.env` file into `process.env` for cleaner configuration. Keeps sensitive values (like port numbers or database URLs) outside your source code.
- **Postman** — A tool for testing REST API endpoints. It allows sending GET, POST, and other HTTP requests and viewing the responses — useful for debugging.


## How to Start and Stop the Server 

Open your terminal and navigate to the root folder of the project (where app.js is located):
~/Codeboxx/Rocket_Elevators_Express$
Then run the following: node app.js
You should see:
Server listening on port 3000
To stop the server, go to the terminal where it’s running and press: ctrl + c
⚠️ Important: If you make changes to .env or to any code that imports new files or modifies route behavior, you must stop and restart the server to see the changes reflected.

---

## What Is A REST API (https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/) 
An API is an application programming interface. It is a set of rules that allow programs to talk to each other. The developer creates the API on the server and allows the client to talk to it.

REST determines how the API looks like. It stands for “Representational State Transfer”. It is a set of rules that developers follow when they create their API. One of these rules states that you should be able to get a piece of data (called a resource) when you link to a specific URL.
Each URL is called a request while the data sent back to you is called a response.

---

## The Anatomy Of A Request
01. The endpoint: (or route) is the url you request for.
    01.1. The path determines the resource you’re requesting for.

02. The method: is the type of request you send to the server. You can choose from these five:
    02.1 GET: used to get a resource from a server. Performs a `READ` operation.
    02.2 POST: used to create a new resource on a server. Performs an `CREATE` operation.
    02.3 PUT: requests used to update a resource on a server. Performs an `UPDATE` operation.
    02.4 PATCH: requests used to update a resource on a server.Performs an `UPDATE` operation.
    02.5 DELETE: used to delete a resource from a server. Performs a `DELETE` operation.

These methods provide meaning for the request you’re making. They are used to perform four possible actions: Create, Read, Update and Delete (CRUD).

03. The headers: used to provide information to both the client and server. t can be used for many purposes, such as authentication and providing information about the body content

04. The data (or body): contains information you want to be sent to the server. This option is only used with POST, PUT, PATCH or DELETE requests.

---

## Authentication 
Since POST, PUT, PATCH and DELETE requests alter the database, developers almost always put them behind an authentication wall. In some cases, a GET request also requires authentication (like when you access your bank account to check your current balance, for example).

On the web, there are two main ways to authenticate yourself:

01. With a username and password (also called basic authentication)
02. With a secret token

---

## HTTP Status Codes And Error Messages #
Some of the messages you’ve received earlier, like “Requires authentication” and “Problems parsing JSON” are error messages. They only appear when something is wrong with your request. HTTP status codes let you tell the status of the response quickly. The range from 100+ to 500+. In general, the numbers follow the following rules:

01. 200+ means the request has succeeded.
02. 300+ means the request is redirected to another URL
03. 400+ means an error that originates from the client has occurred
04. 500+ means an error that originates from the server has occurred

---